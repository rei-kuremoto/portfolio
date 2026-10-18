// Content for the 2026.10 redesign, imported from the Figma file
// (project pages: section 3243:3969, site design: section 3115:130).
// Text is kept verbatim from Figma.

import dimensions from '../assets/images/v2/dimensions.json'

// Every image is keyed by its path under assets/images/v2 (e.g. "hakko/process-01.png")
// and carries its display size in CSS px (from dimensions.json; grid cards and service-site captures are 4x exports, the rest 2x).
const imageModules = import.meta.glob(
  [
    '../assets/images/v2/grid/*.png',
    '../assets/images/v2/*/process-*.png',
    '../assets/images/v2/*/hero.png',
    '../assets/images/v2/service-site/capture-*.webp',
  ],
  { eager: true, import: 'default' },
)
const images = Object.fromEntries(
  Object.entries(imageModules).map(([path, src]) => {
    const key = path.split('/').slice(-2).join('/')
    const [width, height] = dimensions[key]
    return [key, { src, width, height }]
  }),
)

const image = (key) => {
  if (!images[key]) throw new Error(`Missing image ${key}`)
  return images[key]
}

// Top-page grid cards, exported at 4x from the grid in the top_pc frame.
const gridImage = (slug) => image(`grid/${slug}.png`)
// Detail images from each project's second Figma page; positions in figma-layout.json.
const detailImage = (slug, number) => image(`${slug}/process-${number}.png`)
// Full-length page captures, exported from the columns in Figma frame 3254:6302.
const captureImage = (number) => image(`service-site/capture-${number}.webp`)
// Image area of each project's first Figma page.
const heroImage = (slug) => image(`${slug}/hero.png`)

export const processSteps = ['リサーチ', '課題定義', '議論・アイデア出し', 'プロトタイプ', 'デリバリー']

export const metaLabels = {
  period: '制作時期',
  role: '担当領域',
  team: 'チーム構成',
}

export const projectGroups = [
  { key: 'all', label: 'all' },
  { key: 'uiux', label: 'ui/ux' },
  { key: 'graphic', label: 'graphic' },
]

// Order matches the top-page grid.
export const projects = [
  {
    slug: 'data-analytics-launch',
    group: 'uiux',
    label: ['Data Analysis'],
    category: 'データ分析',
    title: 'データ分析機能の立ち上げ〜リリース',
    description: [
      '新規機能であるデータ分析の立ち上げとPhase1リリースのため、リサーチから全体構成・情報設計、プロトタイピングなどを担当。',
      '中小事業者向けに複数サービスを提供しているが、データのありかがバラバラで併用の価値を感じづらい状況だった。また、見られる事業指標が限られており、以前からユーザーより分析強化の要望が届いていた。',
      'オンラインショップと店舗など、複数拠点の購買データが一箇所で見られる画面を実現。',
      'それぞれの指標に合わせたグラフのデザインを行うことで、直感的に理解できるデータ分析ツールを目指した。',
    ],
    period: '2023.4 ~ 2023.9',
    role: 'ユーザーリサーチ、プロトタイプ作成、デザイン',
    team: 'デザイナー（2）, PdM（1）, エンジニア（5）',
    process: ['リサーチ', '課題定義', '議論・アイデア出し', 'プロトタイプ', 'デリバリー'],
    // Fill state of the five process circles, as drawn on the Figma project page.
    processIndicator: ['full', 'full', 'full', 'full', 'full'],
    gridImage: gridImage('data-analytics-launch'),
    summary: 'プロダクトの立ち上げからリリースまでの、リサーチ〜開発のプロセスを経験。初期リリースではユーザーが最も必要とする（汎用性のある）指標と、統一されたデータ分析プラットフォームの実現を両立させることを中心に開発が進んだ。',
    sections: [
      {
        caption: '初期リサーチ：競合や経営指標についての情報整理',
        rows: [
          [detailImage('data-analytics-launch', '01'), detailImage('data-analytics-launch', '02')],
        ],
      },
      {
        caption: '初期ワイヤーフレーム',
        rows: [
          [detailImage('data-analytics-launch', '04')],
        ],
      },
      {
        caption: 'グラフの形を徐々に絞っていった',
        rows: [
          [detailImage('data-analytics-launch', '05')],
        ],
      },
      {
        caption: '1stリリース指標の画面',
        rows: [
          [detailImage('data-analytics-launch', '06'), detailImage('data-analytics-launch', '07')],
          [detailImage('data-analytics-launch', '08'), detailImage('data-analytics-launch', '09')],
        ],
      },
    ],
  },
  {
    slug: 'unified-admin',
    group: 'uiux',
    label: ['Onboarding &', 'New Dashboard'],
    category: '統合管理画面プロジェクト',
    title: 'プロダクト横断で、共通した管理画面と\nオンボーディング体験をつくるプロジェクト',
    description: [
      '複数プロダクトが使える新プランの提供に向けて、ユーザーによりスムーズで一貫性のある体験を提供するため、プロダクトごとにバラバラだった管理画面およびオンボーディング体験を統合するプロジェクトに参加。',
      'プロジェクトのリードプロダクトデザイナーとともに、リサーチ段階から、繰り返しのプロトタイプ制作、画面統合により必要になったUI変更の画面作成、そしてリリース前のユーザビリティテストを通じた体験検証まで行った。',
      '技術的な制約や構造の方針変更に対応しながら、特に既存ユーザーの認知コストをなるべく下げることを意識して管理画面を設計する挑戦となった。',
    ],
    period: '2024.12 ~ 2025.3',
    role: 'リサーチ、情報設計、プロトタイプ作成、UIデザイン、ユーザビリティテスト',
    team: 'デザイナー（3.5）, PdM（1.5）, エンジニア（8）',
    process: ['リサーチ', '課題定義', '議論・アイデア出し', 'プロトタイプ', 'デリバリー'],
    // Fill state of the five process circles, as drawn on the Figma project page.
    processIndicator: ['full', 'full', 'full', 'full', 'full'],
    gridImage: gridImage('unified-admin'),
    summary: 'このプロジェクトに関わるまでに行ってきた複数プロダクトのUI/UXデザイン、それぞれの体験や情報構造に関する知識を活かすことができた。「複数プロダクトのための一つの管理画面」を考える上で、画面がどう繋がっているのか、置き換えや新規作成が必要になる画面はどこか、など複雑な情報整理をチームで行う必要があった。',
    sections: [
      {
        caption: 'オンボーディングフローの整理（ペルソナ別）',
        rows: [
          [detailImage('unified-admin', '01')],
        ],
      },
      {
        caption: '現状と理想体験の整理',
        rows: [
          [detailImage('unified-admin', '02')],
        ],
      },
      {
        caption: '統合されたオンボーディングフロー',
        rows: [
          [detailImage('unified-admin', '07')],
        ],
      },
      {
        caption: 'プロダクトごとに分かれていた管理画面の統一',
        rows: [
          [detailImage('unified-admin', '03')],
          [detailImage('unified-admin', '05')],
        ],
      },
    ],
  },
  {
    slug: 'data-analytics-research',
    group: 'uiux',
    label: ['Data Analysis', 'Dashboard'],
    category: 'データ分析',
    title: 'ユーザーリサーチやインタビューに基づいた開発案件の整理、プロトタイプ作成',
    description: [
      'データ分析機能のリリース後、ユーザーフィードバックの分析やユーザーインタビューなどの実施を通じて利用状況への理解を深めた。',
      'ユーザーリサーチの結果を、KJ法やカスタマージャーニーマップなどのUXツールを使って課題やニーズを分析した。ツールを使うことで、ユーザー行動の流れが可視化され、課題の共通点やパターンを見つけやすくなり、インサイトとして共有しやすくなった。',
      '分析から引き出したニーズをベースに、改善案のUIプロトタイプを作成した。',
    ],
    period: '2023 ~ 2024',
    role: 'ユーザーリサーチ、課題整理、プロトタイプ作成',
    team: 'デザイナー（1）, PdM（1）',
    process: ['リサーチ', '課題定義', '議論・アイデア出し', 'プロトタイプ'],
    // Fill state of the five process circles, as drawn on the Figma project page.
    processIndicator: ['full', 'full', 'full', 'full', 'empty'],
    gridImage: gridImage('data-analytics-research'),
    summary: 'ユーザーインタビューを、データ分析初期ユーザーへ5件、サロン事業者へ8件、アパレル業界の中規模事業者へ4件行った。ユーザーの生の声を聞くことで、言語化できる要望だけでなく、その背景にある理由まで掘り下げることができた。複数ユーザー層へのインタビューを行うことにより、事業者ペルソナごとのニーズの違いや、共通点を把握することができた。',
    sections: [
      {
        caption: 'ユーザーインタビューのリサーチと分析',
        rows: [
          [detailImage('data-analytics-research', '02')],
        ],
      },
      {
        caption: 'ユーザーインタビューの分析、ペルソナ化→カスタマージャーニーマップの作成',
        rows: [
          [detailImage('data-analytics-research', '05')],
        ],
      },
      {
        caption: '管理画面用ダッシュボードのプロトタイプ',
        rows: [
          [detailImage('data-analytics-research', '03'), [detailImage('data-analytics-research', '01'), detailImage('data-analytics-research', '04')]],
        ],
      },
      {
        caption: 'サービス分野向け従業員分析ダッシュボードのプロトタイプ',
        rows: [
          [detailImage('data-analytics-research', '06'), detailImage('data-analytics-research', '07'), detailImage('data-analytics-research', '08'), detailImage('data-analytics-research', '09')],
        ],
      },
    ],
  },
  {
    slug: 'data-visualization',
    group: 'uiux',
    label: ['Data Visualisation'],
    category: 'データ分析',
    title: '追加指標に合わせた\nデータビジュアライゼーションUIのデザイン',
    description: [
      'データ分析の「一箇所にデータがまとまっている」という価値を強化するため、段階的な指標の追加に伴うグラフデザインやUI変更を行った。',
      '従業員別売上分析、新規・既存顧客数、購入経路別売上分析、会員分析など、様々な業種の事業者からのデータのニーズを踏まえて開発。',
      '新しい指標を追加するたび、ユーザーが知りたい情報を最もわかりやすく伝えられる方法を模索し、開発チームとのコミュニケーションでは「なぜこの表現なのか」を言語化してデザイン共有や議論を行った。',
    ],
    period: '2023 ~ 2025',
    role: '情報設計、プロトタイプ作成、UIデザイン',
    team: 'デザイナー（1）, PdM（1）, エンジニア（5）',
    process: ['課題定義', '議論・アイデア出し', 'プロトタイプ', 'デリバリー'],
    // Fill state of the five process circles, as drawn on the Figma project page.
    processIndicator: ['empty', 'full', 'full', 'full', 'full'],
    gridImage: gridImage('data-visualization'),
    summary: '指標が増えていく中で、グラフの見やすさ（アクセシビリティ）を担保しながら、様々なグラフ表現に対応できるカラーシステムも検証・作成。グラフの形は表現する指標に合わせているため異なるが、統一したカラーシステムを各画面に適用することで、プロダクト体験の一貫性を保っている。',
    sections: [
      {
        caption: '色の検証やグラフのプロトタイプ',
        rows: [
          [detailImage('data-visualization', '01'), detailImage('data-visualization', '02')],
        ],
      },
      {
        caption: '他社の分析画面リサーチ',
        rows: [
          [detailImage('data-visualization', '03')],
        ],
      },
      {
        caption: '作成したデータビジュアライゼーションUIの例',
        rows: [
          [detailImage('data-visualization', '04'), detailImage('data-visualization', '05')],
          [detailImage('data-visualization', '06'), detailImage('data-visualization', '07')],
        ],
      },
    ],
  },
  {
    slug: 'brand-app',
    group: 'uiux',
    label: ['Branded App'],
    category: 'ブランドアプリ',
    title: 'ブランドアプリの体験・機能改善のための\nUIデザイン制作',
    description: [
      '事業者が自社アプリを作成できる「STORES ブランドアプリ」の共通体験の改善のため、複数機能のUIデザイン制作を行った。',
      'ネットワーク接続がない時も会員証の提示ができる機能、「マイページ」画面の改善、店舗・オンラインショップ共通クーポン、会員登録前のユーザー向け画面など。',
      'エンドユーザーである購入者向けの画面であるが、事業者が購入者にどのような体験をしてほしいのかも意識して制作を行った。',
    ],
    period: '2024 ~ 2025',
    role: 'リサーチ、プロトタイプ作成、UI/UXデザイン',
    team: 'デザイナー（2）, PdM（1）, エンジニア（4）',
    process: ['課題定義', '議論・アイデア出し', 'プロトタイプ', 'デリバリー'],
    // Fill state of the five process circles, as drawn on the Figma project page.
    processIndicator: ['empty', 'full', 'full', 'full', 'full'],
    gridImage: gridImage('brand-app'),
    summary: 'アプリ利用を通じてブランドのファンになってもらいたい事業者のニーズと、なるべくストレスなくアプリを利用したいユーザーのニーズを両立させる体験を考えた。体験の課題になっている点を解決した上で、よりよいユーザー体験をつくるための提案力が求められた。',
    sections: [
      {
        caption: 'リサーチと要件整理',
        rows: [
          [detailImage('brand-app', '01')],
          [detailImage('brand-app', '06'), detailImage('brand-app', '07')],
        ],
      },
      {
        caption: 'デザインパターン検討',
        rows: [
          [detailImage('brand-app', '02')],
          [detailImage('brand-app', '08')],
        ],
      },
      {
        caption: '最終画面（抜粋）',
        rows: [
          [detailImage('brand-app', '03'), detailImage('brand-app', '04'), detailImage('brand-app', '05'), detailImage('brand-app', '09')],
        ],
      },
    ],
  },
  {
    slug: 'pos-reservation',
    group: 'uiux',
    label: ['Service POS'],
    category: 'POSレジ',
    title: 'POSレジと予約システムを連携した\nユーザー体験向上のためのUI制作',
    description: [
      'POSレジと予約システムを併用したときの、連携したサービス体験の改善。',
      '先行してリリースされたメニュー型の予約に加え、レッスン・イベント型（1日に決まった予約枠が設定されている）の予約もレジで見やすくするUIの作成。また、予約台帳がレジ画面から使いづらく、店頭で顧客対応しながら予約を取りにくいという課題を解決するためのプロトタイプ作成を行った。',
      '既存の予約システムとの連動性を踏まえつつ、レジのUIシステムの中でいかに使いやすく組み込むかを追求した。',
    ],
    period: '2024.5 ~ 2024.8',
    role: 'プロトタイプ作成、UI/UXデザイン',
    team: 'デザイナー（1）, PdM（1）, エンジニア（4）',
    process: ['課題定義', '議論・アイデア出し', 'プロトタイプ', 'デリバリー'],
    // Fill state of the five process circles, as drawn on the Figma project page.
    processIndicator: ['empty', 'full', 'full', 'full', 'full'],
    gridImage: gridImage('pos-reservation'),
    summary: 'レジという店舗の中でも忙しい場所で、いかにユーザーである従業員に負担を感じさせない体験を実現できるかが問われた。予約追加に関しては電話予約と施術後の次回予約の2つの場面を想定して画面を設計。レッスン・イベント予約の画面は、オーナーインタビューの結果をもとに、予約人数や定員を確認しながら受付・会計できる画面を作成した。',
    sections: [
      {
        caption: 'リサーチと要件整理',
        rows: [
          [detailImage('pos-reservation', '01')],
          [detailImage('pos-reservation', '06')],
        ],
      },
      {
        caption: 'プロトタイプ',
        rows: [
          [detailImage('pos-reservation', '02')],
          [detailImage('pos-reservation', '05')],
          [detailImage('pos-reservation', '07')],
        ],
      },
      {
        caption: '最終画面（抜粋）',
        rows: [
          [detailImage('pos-reservation', '03'), detailImage('pos-reservation', '04')],
          [detailImage('pos-reservation', '08'), detailImage('pos-reservation', '09')],
        ],
      },
    ],
  },
  {
    slug: 'loyalty-program',
    group: 'uiux',
    label: ['Loyalty Program'],
    category: 'ポイント・ランクシステム',
    title: 'ロイヤリティプログラムサービス提供のための\n既存プロダクトへのUI変更対応',
    description: [
      '事業者が自社ロイヤリティプログラムを設計できる新たなサービス「STORES ロイヤリティ」の提供に伴い、ネットショップやPOSレジの管理画面と購入者画面の、ポイント表示・利用などに対応した画面を作成。',
      '複数プロダクトをつなぐ体験、かつ事業者の画面にも購入者の画面にも変更が伴うため、多くの画面にまたがる情報の整理と把握が求められた。',
      '画面ごとに異なるデザインルールの中で、それぞれのトーンを崩さず機能変更に対応するUI変更を行った。',
    ],
    period: '2024.4 ~ 2024.5',
    role: '情報設計、プロトタイプ作成、UIデザイン',
    team: 'デザイナー（2）, PdM（2）, エンジニア（4）',
    process: ['議論・アイデア出し', 'プロトタイプ', 'デリバリー'],
    // Fill state of the five process circles, as drawn on the Figma project page.
    processIndicator: ['empty', 'empty', 'full', 'full', 'full'],
    gridImage: gridImage('loyalty-program'),
    sections: [
      {
        caption: 'POSレジ画面UI',
        rows: [
          [detailImage('loyalty-program', '01')],
        ],
      },
      {
        caption: '管理画面UI',
        rows: [
          [detailImage('loyalty-program', '02')],
        ],
      },
      {
        caption: 'メールUI',
        rows: [
          [detailImage('loyalty-program', '03')],
        ],
      },
      {
        caption: '購入者画面UI',
        rows: [
          [detailImage('loyalty-program', '04')],
          [detailImage('loyalty-program', '05'), detailImage('loyalty-program', '06')],
        ],
      },
      {
        caption: '最終画面例',
        rows: [
          [detailImage('loyalty-program', '08'), detailImage('loyalty-program', '09')],
          [detailImage('loyalty-program', '07')],
          [detailImage('loyalty-program', '10'), detailImage('loyalty-program', '11')],
        ],
      },
    ],
  },
  {
    slug: 'hakko',
    group: 'uiux',
    // Also listed (last) under the graphic filter.
    alsoIn: ['graphic'],
    label: ['HAKKO'],
    category: 'HAKKO',
    title: '小規模レストランに特化した予約システムの、ブランドアイデンティティからUIデザインまで',
    description: [
      '知人からの依頼により、小規模の高価格帯レストランに特化した予約システムの、ロゴからサービスのUIデザインまで一貫して制作した。',
      '操作のシンプルさは保ちつつ、レストランがこだわりや個性を出せる体験をつくるための機能整理とUI作成が求められた。',
      'レストランとお客様の間のコミュニケーションを担うメディアとして、お客様ひとりひとりに特別な体験を提供するための工夫や、近い関係性を築けるサービスのあり方を意識した。',
    ],
    period: '2023.11 ~ 2024.4',
    role: 'ブランドアイデンティティ、情報設計、プロトタイプ作成、UIデザイン',
    team: '依頼者（PdM）, デザイナー（1）, エンジニア（1）',
    process: ['議論・アイデア出し', 'プロトタイプ', 'デリバリー'],
    // Fill state of the five process circles, as drawn on the Figma project page.
    processIndicator: ['empty', 'full', 'full', 'full', 'full'],
    gridImage: gridImage('hakko'),
    sections: [
      {
        caption: '要件整理',
        rows: [
          [detailImage('hakko', '01'), detailImage('hakko', '02')],
        ],
      },
      {
        caption: 'ワイヤーフレーム',
        rows: [
          [detailImage('hakko', '05'), detailImage('hakko', '06')],
        ],
      },
      {
        caption: 'プロトタイプ作成',
        rows: [
          [detailImage('hakko', '08')],
          [detailImage('hakko', '10')],
          [detailImage('hakko', '12')],
        ],
      },
      {
        caption: '管理画面（抜粋）',
        rows: [
          [detailImage('hakko', '04')],
        ],
      },
      {
        caption: 'ユーザー画面',
        rows: [
          [detailImage('hakko', '09')],
        ],
      },
      {
        caption: 'ブランドアイデンティティ',
        rows: [
          [detailImage('hakko', '03')],
        ],
      },
      {
        caption: 'UIシステム',
        rows: [
          [detailImage('hakko', '07')],
          [detailImage('hakko', '11')],
        ],
      },
    ],
  },
  {
    slug: 'service-site',
    group: 'graphic',
    label: ['Service Site'],
    category: 'サービスサイト',
    title: '会社サービスサイトの改善・運用',
    description: [
      '会社のプロダクトを紹介するサイトのデザインやLP、キャンペーンやプロモーションページの作成。',
      'マーケティングや事業推進の担当者と連携し、サイトの効果を引き出せるよう、見る人の興味や共感を得られる表現を考えながらデザインを提案。',
      'サイト上で使う機能説明やヒーローのビジュアルなど、画像素材の制作も行った。',
      'AIコーディングにより実装までデザイナーが行うことになってからは、よりスムーズにサイト更新ができるよう、UIコンポーネントの作成やデザインルールの設定などを行った。',
    ],
    period: '2025.7 ~ 現在',
    role: '要件整理、ワイヤーフレーム作成、デザイン、実装（AIコーディング）',
    team: 'デザイナー, プロジェクトマネージャー',
    process: ['課題定義', '議論・アイデア出し', 'プロトタイプ', 'デリバリー'],
    // Fill state of the five process circles, as drawn on the Figma project page.
    processIndicator: ['empty', 'full', 'full', 'full', 'full'],
    gridImage: gridImage('service-site'),
    summary: 'サービスサイト上のデザインでも、ユーザーがプロダクト導入へ進んだあと迷わず利用開始できるかを意識して情報の伝え方を考えた。施策や機能ページで重要な訴求はしっかりと正確に伝えつつ、初見でも理解しやすい情報量や表現に落とし込んでデザイン提案を行った。',
    // Shown as a horizontally scrolling strip instead of sections, in the order of
    // the Figma frame 3254:6302 (payments, regi, PR, campaign event, …, new-open LP).
    captures: ['01', '02', '03', '04', '05', '06', '07', '08'].map(captureImage),
  },
  {
    slug: 'diversity-report',
    group: 'graphic',
    label: ['Report Design'],
    category: 'STORES Diversity Report 2025',
    title: '会社のジェンダーダイバーシティ促進活動を\nまとめた年次レポートのデザイン',
    description: [
      '会社のジェンダーダイバーシティ促進活動をまとめた年次レポートのメインビジュアルからエディトリアルデザインまで担当した。',
      'インタビュー（対談）、活動報告、データビジュアライゼーションなど、レポート内の多様なコンテンツをわかりやすく伝えるための構成設計とページデザイン。',
      'また、例年のダイバーシティレポートのカラーパレットを踏襲しつつ、今年の進歩を「これまで磨いてきたものが徐々に宝石のように輝き始めている」というビジュアルで表現した。',
    ],
    period: '2026.2 ~ 2026.3',
    role: 'メインビジュアル作成、デザイン',
    team: 'デザイナー, デザイン監督, 人事（依頼者）',
    process: ['課題定義', '議論・アイデア出し', 'プロトタイプ', 'デリバリー'],
    // Fill state of the five process circles, as drawn on the Figma project page.
    processIndicator: ['empty', 'half', 'full', 'full', 'full'],
    gridImage: gridImage('diversity-report'),
    sections: [
      {
        caption: null,
        rows: [
          [detailImage('diversity-report', '01'), detailImage('diversity-report', '02')],
          [detailImage('diversity-report', '03'), detailImage('diversity-report', '04')],
          [detailImage('diversity-report', '05'), detailImage('diversity-report', '06')],
          [detailImage('diversity-report', '07'), detailImage('diversity-report', '08')],
          [detailImage('diversity-report', '09'), detailImage('diversity-report', '10')],
          [detailImage('diversity-report', '11'), detailImage('diversity-report', '12')],
        ],
      },
    ],
  },
  {
    slug: 'new-grad-events',
    group: 'graphic',
    label: ['Event Graphic'],
    category: '2026年度内定式・入社式',
    title: '新卒社員向けイベントの\nメインビジュアル、グッズデザイン',
    description: [
      '新卒として入社する社員を歓迎する、内定式と入社式のメインビジュアルとグッズ展開。',
      '内定式では、「自身の強みを持ちつつ、いろんな領域を横断して活躍してほしい」というメッセージを多色の光を巻き込みながら進んでいく星をモチーフに表現。',
      '一方、入社式ではより「領域を飛び越える」ことを意識したグラフィックで表現し、新たな始まりを楽しみにしてもらえることを狙った。',
    ],
    period: '2025.８、2026.3',
    role: 'メインビジュアル作成、グッズ展開、デザイン',
    team: 'デザイナー, 人事（依頼者）',
    process: ['課題定義', '議論・アイデア出し', 'プロトタイプ', 'デリバリー'],
    // Fill state of the five process circles, as drawn on the Figma project page.
    processIndicator: ['empty', 'full', 'full', 'full', 'full'],
    gridImage: gridImage('new-grad-events'),
    sections: [
      {
        caption: null,
        rows: [
          [heroImage('new-grad-events')],
        ],
      },
    ],
  },
  {
    slug: 'digital-ads',
    group: 'graphic',
    label: ['Banner Design'],
    category: 'デジタル広告',
    title: '自社プロダクトの広告バナーやキャンペーンバナーの制作、既存バナーの改善施策',
    description: [
      '会社の製品やセミナーイベント、キャンペーンなどを紹介する広告用バナーの作成。',
      '情報量が多くなりがちなセミナーバナーは、目を引くデザインにしつつトークテーマが伝わることを意識し、広告・キャンペーンバナーでは、ターゲットに自分ごととして感じてもらえるよう、特典や訴求ポイントを一番に伝えることを心がけた。',
      '広告の効果測定データをもとに、効果的なレイアウトや訴求方法を模索した。',
    ],
    period: '2025.7 ~ 2026.1',
    role: 'バナーデザイン',
    team: 'デザイナー, マーケティング（依頼者）',
    process: ['議論・アイデア出し', 'プロトタイプ', 'デリバリー'],
    // Fill state of the five process circles, as drawn on the Figma project page.
    processIndicator: ['empty', 'empty', 'full', 'full', 'full'],
    gridImage: gridImage('digital-ads'),
    sections: [
      {
        caption: null,
        rows: [
          [heroImage('digital-ads')],
        ],
      },
    ],
  },
]

export const projectBySlug = Object.fromEntries(projects.map((project) => [project.slug, project]))

// Menu order (from the menu_sp frame), split into its two groups.
export const menuProjects = [
  ['data-analytics-launch', 'unified-admin', 'data-analytics-research', 'brand-app', 'pos-reservation', 'data-visualization', 'loyalty-program', 'hakko'],
  ['service-site', 'diversity-report', 'new-grad-events', 'digital-ads'],
].map((slugs) => slugs.map((slug) => projectBySlug[slug]))

// Design philosophy page (design_philosophy frame). Each paragraph is a list of
// lines; a line is either a string or a list of { text, highlight } runs.
export const designPhilosophy = {
  number: '01',
  heading: 'デザインの考え方',
  paragraphs: [
    [
      '私がデザインする上で最も大切にしているのは、',
      [
        { text: '「ユーザーの視点からみて、どのような体験を提供できているか？」', highlight: true },
        { text: 'を考えることです。' },
      ],
    ],
    [
      'これまでにプロダクトデザインとコミュニケーションデザインの両方を経験し、サービス内のユーザー体験をつくることと、まだサービスを使っていないユーザーにサービスを知ってもらう接点の体験づくりを行いました。',
    ],
    [
      '一貫して大切にしてきたのは、ユーザー理解に基づいて課題の本質を捉え、より良い体験につながるデザインを考えることです。情報を整理し、ユーザーの課題解決とサービスの価値向上につながるデザインを目指しています。',
    ],
  ],
  diagramLabels: {
    journey: 'ユーザー体験',
    before: '体験前',
    during: '（体験）',
    after: '体験後',
  },
}

export const designProcess = {
  number: '02',
  heading: 'デザインの進め方',
  paragraphs: [
    [
      'デザインする際には、ユーザーに「どのような体験をしてほしいのか」を設計するために、',
      'このようなプロセスでリサーチからデリバリーまで取り組んでいます。',
      '制作物に応じて取り組み方は異なりますが、「なぜつくるのか」をもとに',
      '「なにを、どうつくるのか」に結びつけることを大切にしています。',
    ],
  ],
  arrowLabels: ['なぜつくるのか', 'なにをつくるのか', 'どうつくるのか'],
  steps: [['リサーチ'], ['課題定義'], ['議論・', 'アイデア出し'], ['プロトタイプ'], ['デリバリー']],
}
