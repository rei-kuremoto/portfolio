#!/usr/bin/env python3
"""Rasterize a Figma MCP SVG export to a transparent PNG with headless Chrome.

Usage: figma-svg-to-png.py <out.png> <figma-asset-id.svg> [--uncrop X Y W H] [--scale N]

Figma's MCP exports render a node in the context of its page, so they include
the canvas/section/page backgrounds and are clipped to the page frame. This
strips those backgrounds and, with --uncrop (the node's x/y/width/height inside
its page), removes the page clip and grows the canvas to the node's full bounds.
"""
import math
import os
import re
import subprocess
import sys
import tempfile

args = sys.argv[1:]
uncrop = None
if '--uncrop' in args:
    i = args.index('--uncrop')
    uncrop = tuple(float(v) for v in args[i + 1:i + 5])
    del args[i:i + 5]
scale = '2'
if '--scale' in args:
    i = args.index('--scale')
    scale = args[i + 1]
    del args[i:i + 2]
out, asset = args[0], args[1]

s = subprocess.run(['curl', '-sfL', 'https://www.figma.com/api/mcp/asset/' + asset],
                   check=True, capture_output=True).stdout.decode()
# Canvas background, then the section's fill/border paths, then the page frame's fill.
s = re.sub(r'(<svg[^>]*>\s*)<rect width="[\d.]+" height="[\d.]+" fill="#BEBEBE"/>\s*', r'\1', s, count=1)
s = re.sub(r'(<svg[^>]*>\s*<g id="[^"]*">\s*)<path d="[^"]*" fill="white"/>\s*<path d="[^"]*" fill="black" fill-opacity="0.1"/>\s*',
           r'\1', s, count=1)
page_bg = re.search(r'(<svg[^>]*>\s*<g id="[^"]*">\s*<g id="[^"]*"[^>]*>\s*)'
                    r'(<rect width="[\d.]+" height="[\d.]+"(?: transform="translate\(([-\d.]+)(?: ([-\d.]+))?\)")? fill="#[0-9A-Fa-f]{6}"/>\s*)', s)
tx = float(page_bg.group(3) or 0) if page_bg else 0.0
ty = float(page_bg.group(4) or 0) if page_bg else 0.0
if page_bg:
    s = s[:page_bg.start(2)] + s[page_bg.end(2):]

m = re.match(r'<svg width="([\d.]+)" height="([\d.]+)" viewBox="[^"]*"', s)
W, H = float(m.group(1)), float(m.group(2))
vx, vy, vw, vh = 0.0, 0.0, W, H

if uncrop:
    x, y, w, h = uncrop
    left, top = tx + x, ty + y
    right, bottom = left + w, top + h
    # Effect (shadow) padding, measured on whichever side wasn't clipped.
    pad_x = left if left >= 0 else (W - right if right <= W else 0)
    pad_y = top if top >= 0 else (H - bottom if bottom <= H else 0)
    vx, vy = min(0, left - pad_x), min(0, top - pad_y)
    vw = max(W, right + pad_x) - vx
    vh = max(H, bottom + pad_y) - vy
    # Drop the page frame's clip (the first clip-path on a group under the section).
    s = re.sub(r'(<svg[^>]*>\s*<g id="[^"]*">\s*<g id="[^"]*") clip-path="url\(#[^)]*\)"', r'\1', s, count=1)
    s = re.sub(r'<svg width="[\d.]+" height="[\d.]+" viewBox="[^"]*"',
               f'<svg width="{vw:g}" height="{vh:g}" viewBox="{vx:g} {vy:g} {vw:g} {vh:g}"', s, count=1)

d = tempfile.mkdtemp()
open(f'{d}/a.svg', 'w').write(s)
open(f'{d}/a.html', 'w').write(
    f'<html><body style="margin:0;background:transparent">'
    f'<img src="a.svg" style="display:block;width:{vw:g}px;height:{vh:g}px"></body></html>')
subprocess.run(['/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', '--headless=new', '--disable-gpu',
                '--hide-scrollbars', f'--user-data-dir={d}/profile',
                f'--screenshot={os.path.abspath(out)}', f'--window-size={math.ceil(vw)},{math.ceil(vh)}',
                f'--force-device-scale-factor={scale}', '--default-background-color=00000000',
                f'file://{d}/a.html'], check=True, capture_output=True, timeout=180)
print(out, f'{vw:g}x{vh:g}')
