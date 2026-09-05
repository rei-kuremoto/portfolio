import { useState } from 'react'
import version3 from '../assets/images/communication-version3.png'
import version2 from '../assets/images/communication-version2.png'
import productSite from '../assets/images/communication-product-site.png'
import diversityReport from '../assets/images/communication-diversity-report.png'
import onboardingWelcome from '../assets/images/communication-onboarding-welcome.png'
import techFlyers from '../assets/images/communication-tech-flyers.png'
import adBanners from '../assets/images/communication-ad-banners.png'
import productDesignIpad from '../assets/images/main-product-design-ipad.png'
import appDesignPhone from '../assets/images/main-app-design-phone.png'
import photography from '../assets/images/main-photography.png'
import Carousel from './Carousel'
import WorkDetailModal from './WorkDetailModal'
import PhotographyModal from './PhotographyModal'

import v3Wall from '../assets/images/detail/version3/01-wall.png'
import v3Quiz from '../assets/images/detail/version3/02-quiz.png'
import v3Laptop from '../assets/images/detail/version3/03-laptop.png'
import v3Gacha from '../assets/images/detail/version3/04-gacha.png'
import v3TshirtWhite from '../assets/images/detail/version3/05-tshirt-white.png'
import v3TshirtBlack from '../assets/images/detail/version3/06-tshirt-black.png'
import v3ToteKeychain from '../assets/images/detail/version3/07-tote-keychain.png'
import v3KeychainHand from '../assets/images/detail/version3/08-keychain-hand.png'

import v2Wall from '../assets/images/detail/version2/01-wall.png'
import v2Pointing from '../assets/images/detail/version2/02-pointing.png'
import v2Writing from '../assets/images/detail/version2/03-writing.png'
import v2Stickers from '../assets/images/detail/version2/04-stickers.png'
import v2TshirtWhite from '../assets/images/detail/version2/05-tshirt-white.png'
import v2ShirtsFolded from '../assets/images/detail/version2/06-shirts-folded.png'

import serviceSiteCollage from '../assets/images/detail/service-site/01-collage.png'
import serviceSiteVideo1 from '../assets/images/detail/service-site/02-details.mp4'
import serviceSiteVideo2 from '../assets/images/detail/service-site/03-details.mp4'

import adBannersCollage from '../assets/images/detail/ad-banners/01-collage.png'

import techFlyersFlyers from '../assets/images/detail/tech-flyers/01-flyers.png'
import techFlyersTrifold from '../assets/images/detail/tech-flyers/02-trifold.png'

import onboardingTote from '../assets/images/detail/onboarding/01-tote.png'
import onboardingBrochure from '../assets/images/detail/onboarding/02-brochure.png'
import onboardingKeychain from '../assets/images/detail/onboarding/03-keychain.png'
import onboardingHoodieBackpack from '../assets/images/detail/onboarding/04-hoodie-backpack.png'
import onboardingCards from '../assets/images/detail/onboarding/05-cards.png'
import onboardingStickersFanned from '../assets/images/detail/onboarding/06-stickers-fanned.png'

import productDesignPage1 from '../assets/images/detail/product-design/01.png'
import productDesignPage2 from '../assets/images/detail/product-design/02.png'
import productDesignPage3 from '../assets/images/detail/product-design/03.png'
import productDesignPage4 from '../assets/images/detail/product-design/04.png'
import productDesignPage5 from '../assets/images/detail/product-design/05.png'

import hakkoPage1 from '../assets/images/detail/hakko/01.png'
import hakkoPage2 from '../assets/images/detail/hakko/02.png'

const diversityReportModules = import.meta.glob(
  '../assets/images/detail/diversity-report/*.webp',
  { eager: true, import: 'default' },
)
const diversityReportPages = Object.keys(diversityReportModules)
  .sort()
  .map((key) => diversityReportModules[key])

const TAGS = [
  { key: 'uiux', label: 'ui/ux' },
  { key: 'graphic', label: 'graphic' },
  { key: 'digital', label: 'digital' },
  { key: 'print', label: 'print' },
  { key: 'editorial', label: 'editorial' },
  { key: 'other', label: 'other' },
]

const slides = [
  {
    caption: 'VERSION #3 / 2026.05',
    categories: ['graphic', 'digital', 'print', 'other'],
    outerClass: 'w-full md:w-[462px]',
    image: (
      <img
        src={version3}
        alt="STORES VERSION conference audience"
        className="h-auto w-full"
      />
    ),
    detail: {
      title: 'VERSION by STORES #3',
      subtitle: '(全社イベント)',
      description: [
        '年2度、プロダクトリリースや改善の取り組みを祝う全社イベントの展示物やグッズ制作。',
        '「大感謝祭」のテーマに合わせて企画者とイメージを擦り合わせながら制作物を提案し、リードデザイナーのメインビジュアルとイラストをもとにアパレルやグッズ、イベント装飾品を展開した。イベントをより盛り上げる工夫を意識しながら取り組んだ。',
      ],
      tags: ['goods design', 'graphic design', 'experience design'],
      date: '2026.05',
      layout: 'grid',
      rowSizes: [2, 2, 4],
      images: [
        v3Wall,
        v3Quiz,
        v3Laptop,
        v3Gacha,
        v3TshirtWhite,
        v3TshirtBlack,
        v3ToteKeychain,
        v3KeychainHand,
      ],
    },
  },
  {
    caption: 'VERSION #2 / 2025.10',
    categories: ['graphic', 'print', 'other'],
    outerClass: 'w-full md:w-[462px]',
    image: (
      <img
        src={version2}
        alt="STORES VERSION conference stage presentation"
        className="h-auto w-full"
      />
    ),
    detail: {
      title: 'VERSION by STORES #2',
      subtitle: '(全社イベント)',
      description: [
        '年2度、プロダクトリリースや改善の取り組みを祝う全社イベントの展示物やグッズ制作。',
        '日常の仕事風景を撮影して展示物に展開したほか、リードデザイナーが作成したメインビジュアルをもとに、アパレルや記念ステッカーを制作した。',
      ],
      tags: ['goods design', 'photography', 'exhibition design'],
      date: '2025.10',
      layout: 'grid',
      rowSizes: [2, 2, 2],
      images: [v2Wall, v2Pointing, v2Writing, v2Stickers, v2TshirtWhite, v2ShirtsFolded],
    },
  },
  {
    caption: 'service site / 2025-2026',
    categories: ['uiux', 'graphic', 'digital'],
    outerClass: 'w-full md:w-[462px]',
    image: (
      <img
        src={productSite}
        alt="STORES product site shown on a MacBook"
        className="h-auto w-full"
      />
    ),
      detail: {
      title: 'サービスサイト',
      description: [
        '会社のプロダクトを紹介するサイトのデザインやLP、キャンペーンやプロモーションページの作成。',
        'CVR改善のために、情報設計や説明ビジュアルを見直しながらプロダクトのことがわかりやすく伝わるサイトの構築を試みた。マーケティングや事業推進の担当者と連携し、見る人の興味や共感を得られる表現を考えながらデザインを提案した。',
      ],
      tags: ['website design', 'graphic design'],
      date: '2025 ~ 2026',
      layout: 'pager',
      images: [serviceSiteCollage, serviceSiteVideo1, serviceSiteVideo2],
    },
  },
  {
    caption: 'diversity report 2025 / 2026.03',
    categories: ['graphic', 'editorial'],
    outerClass: 'w-full md:w-[462px]',
    image: (
      <img
        src={diversityReport}
        alt="Diversity report 2025 slide deck mockup"
        className="h-auto w-full"
      />
    ),
    detail: {
      title: (
        <>
          STORES Diversity
          <br />
          Report 2025
        </>
      ),
      description: [
        '会社のジェンダーダイバーシティ促進活動をまとめた年次レポートのデザイン。',
        'インタビュー(対談)、活動報告、データビジュアライゼーションなど、多様なコンテンツをわかりやすく伝えるための構成設計とページ上の工夫を行った。',
        'また、例年のダイバーシティレポートのカラーパレットを踏襲しつつ、今年の進歩を「これまで磨いてきたものが徐々に宝石のように輝き始めている」というビジュアルで表現した。',
      ],
      tags: ['editorial design', 'infographic'],
      date: '2026.03',
      layout: 'pager',
      images: diversityReportPages,
    },
  },
  {
    caption: (
      <>
        onboarding ceremony / 2026.04
        <br />
        welcome ceremony / 2025.09
      </>
    ),
    categories: ['graphic', 'print'],
    outerClass: 'w-full md:w-[462px]',
    image: (
      <img
        src={onboardingWelcome}
        alt="STORES onboarding ceremony and welcome ceremony key visuals"
        className="h-auto w-full"
      />
    ),
    detail: {
      title: '26年内定式・入社式',
      description: [
        '新卒として入社する社員を歓迎する、内定式と入社式のメインビジュアルとグッズ展開。',
        '内定式では、「自身の強みを持ちつつ、いろんな領域を横断して活躍してほしい」というメッセージを伝えるために、多色の光を巻き込みながら進んでいく星をモチーフにした。',
        '一方入社式では、より「領域を飛び越える」ことを意識したグラフィックで表現し、新たな始まりを楽しみにしてもらえることを狙った。',
      ],
      tags: ['illustration', 'graphic design'],
      date: '2025.09/2026.04',
      layout: 'grid',
      rowSizes: [2, 2, 2],
      images: [
        onboardingTote,
        onboardingBrochure,
        onboardingKeychain,
        onboardingHoodieBackpack,
        onboardingCards,
        onboardingStickersFanned,
      ],
    },
  },
  {
    caption: 'tech flyers / 2025',
    categories: ['graphic', 'print', 'editorial'],
    outerClass: 'w-full md:w-[462px]',
    image: (
      <img
        src={techFlyers}
        alt="Tech flyers layout mockup"
        className="h-auto w-full"
      />
    ),
    detail: {
      title: (
        <>
          採用・テック
          <br />
          イベント用チラシ
        </>
      ),
      description: [
        '会社協賛イベントのためのチラシや、学生採用に向けて会社について伝えるチラシの作成。',
        '協賛イベント向けのチラシでは、イベントごとのデザインテーマに合わせながら、登壇者などの情報をわかりやすく整理した。',
        '採用向けのチラシでは、会社のことをしっかり伝えながらワクワクしてもらえるよう、画像や色づかいを工夫した。',
      ],
      tags: ['graphic design'],
      date: '2025',
      layout: 'grid',
      rowSizes: [1, 1],
      images: [techFlyersFlyers, techFlyersTrifold],
    },
  },
  {
    caption: 'ad banners / 2025',
    categories: ['graphic', 'digital'],
    outerClass: 'w-full md:w-[462px]',
    image: (
      <img
        src={adBanners}
        alt="Ad banner designs"
        className="h-auto w-full"
      />
    ),
    detail: {
      title: '広告バナー',
      description: [
        '会社の製品やセミナーイベント、キャンペーンなどを紹介する広告用バナーの作成。それぞれのバナーのコンセプトや情報量に合わせてデザインを行った。',
        '情報量が多くなりがちなセミナーバナーは、目を引くデザインにしつつトークテーマが伝わることを意識し、広告・キャンペーンバナーでは、ターゲットに自分ごととして感じてもらえるよう、特典や訴求ポイントを一番に伝えることを心がけた。',
        '広告の効果測定データをもとに、効果的なレイアウトや訴求方法を模索した。',
      ],
      tags: ['graphic design'],
      date: '2025',
      layout: 'grid',
      rowSizes: [1],
      images: [adBannersCollage],
    },
  },
  {
    caption: 'product design / 2023-2025',
    categories: ['uiux', 'digital', 'other'],
    outerClass: 'w-full md:w-[462px]',
    image: (
      <img
        src={productDesignIpad}
        alt="STORES analytics app on iPad, sales breakdown and customer demographics"
        className="h-auto w-full"
      />
    ),
    detail: {
      title: (
        <>
          product design at
          <br />
          STORES
        </>
      ),
      description: [
        'データ分析プロダクトのUI/UXを担当。プロダクトの機能改善や新機能のデザインにも携わった。',
        'ユーザーのフィードバックを参考にしたり、時にはユーザーインタビューを通じてニーズを細かく分析したりしながら、プロダクトの改善に取り組んだ。「使いやすいプロダクト」を常に意識し、最善のUIを模索した。',
      ],
      tags: ['UX research', 'UI/UX design'],
      date: '2023 ~ 2025',
      layout: 'pager',
      images: [productDesignPage1, productDesignPage2, productDesignPage3, productDesignPage4, productDesignPage5],
    },
  },
  {
    caption: 'visual identity & app design / 2024',
    categories: ['graphic', 'uiux', 'digital', 'other'],
    outerClass: 'w-full md:w-[462px]',
    image: (
      <img
        src={appDesignPhone}
        alt="App design screens for reservation and settings"
        className="h-auto w-full"
      />
    ),
    detail: {
      title: 'HAKKO',
      description: [
        '小規模レストランに特化した予約システムの、ブランドアイデンティティからサービスのUIデザインまで一貫して制作した。',
        'レストランとお客さんの間のコミュニケーションを担うメディアとして、お客さんひとりひとりに特別な体験を提供するための工夫や、近い関係性を築けるサービスのあり方を意識した。',
      ],
      tags: ['brand design', 'UI/UX design'],
      date: '2023.11 ~ 2024.04',
      layout: 'pager',
      images: [hakkoPage1, hakkoPage2],
    },
  },
  {
    caption: 'personal work / photography',
    categories: ['other'],
    outerClass: 'w-full md:w-[462px]',
    isPhotography: true,
    image: (
      <img
        src={photography}
        alt="Personal photography, plants and a festival lantern procession"
        className="h-auto w-full"
      />
    ),
  },
]

export default function MainCarousel() {
  const [activeTag, setActiveTag] = useState(null)
  const [activeWork, setActiveWork] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isPhotoModalOpen, setIsPhotoModalOpen] = useState(false)

  const filteredSlides = activeTag
    ? slides.filter((slide) => slide.categories.includes(activeTag))
    : slides

  const carouselSlides = filteredSlides.map((slide) => {
    if (slide.isPhotography) {
      return {
        ...slide,
        image: (
          <button
            type="button"
            onClick={() => setIsPhotoModalOpen(true)}
            className="block h-full w-full text-left"
          >
            {slide.image}
          </button>
        ),
      }
    }
    if (!slide.detail) return slide
    return {
      ...slide,
      image: (
        <button
          type="button"
          onClick={() => {
            setActiveWork(slide.detail)
            setIsModalOpen(true)
          }}
          className="block h-full w-full text-left"
        >
          {slide.image}
        </button>
      ),
    }
  })

  return (
    <div>
      <div className="mb-8 flex flex-wrap gap-2 md:mb-10 md:gap-3">
        {TAGS.map((tag) => {
          const selected = activeTag === tag.key
          return (
            <button
              key={tag.key}
              type="button"
              onClick={() => setActiveTag(selected ? null : tag.key)}
              aria-pressed={selected}
              className={`rounded-full border border-[#1f1c1c] px-3 py-0.5 font-mono text-sm font-medium transition-colors md:px-4 md:py-1 md:text-base ${
                selected
                  ? 'bg-[#1f1c1c] text-[#f8f8f8]'
                  : 'bg-transparent text-[#1f1c1c] hover:bg-[#1f1c1c]/5'
              }`}
            >
              {tag.label}
            </button>
          )
        })}
      </div>

      <Carousel
        key={activeTag ?? 'all'}
        slides={carouselSlides}
        loop={!activeTag}
        autoAdvance={!activeTag}
      />

      <WorkDetailModal
        work={activeWork}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />

      <PhotographyModal
        isOpen={isPhotoModalOpen}
        onClose={() => setIsPhotoModalOpen(false)}
      />
    </div>
  )
}
