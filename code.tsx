// This is a counter widget with buttons to increment and decrement the number.

const { widget } = figma
const { useSyncedState, useEffect, usePropertyMenu, waitForTask, AutoLayout, Text, SVG } = widget

const leftQuotationSvgSrc = `<svg width="118" height="102" viewBox="0 0 118 102" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M106.618 51H88.4038V36.4286C88.4038 28.3915 94.9381 21.8571 102.975 21.8571H104.797C107.825 21.8571 110.261 19.421 110.261 16.3929V5.46429C110.261 2.43616 107.825 0 104.797 0H102.975C82.8484 0 66.5466 16.3018 66.5466 36.4286V91.0714C66.5466 97.1049 71.4417 102 77.4752 102H106.618C112.652 102 117.547 97.1049 117.547 91.0714V61.9286C117.547 55.8951 112.652 51 106.618 51ZM41.0466 51H22.8323V36.4286C22.8323 28.3915 29.3667 21.8571 37.4038 21.8571H39.2252C42.2533 21.8571 44.6895 19.421 44.6895 16.3929V5.46429C44.6895 2.43616 42.2533 0 39.2252 0H37.4038C17.277 0 0.975204 16.3018 0.975204 36.4286V91.0714C0.975204 97.1049 5.87029 102 11.9038 102H41.0466C47.0801 102 51.9752 97.1049 51.9752 91.0714V61.9286C51.9752 55.8951 47.0801 51 41.0466 51Z" fill="#16B6DF"/>
</svg>
`

const rightQuotationSvgSrc = `<svg width="117" height="102" viewBox="0 0 117 102" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M11.0974 51H29.3117V65.5714C29.3117 73.6085 22.7773 80.1429 14.7402 80.1429H12.9188C9.89069 80.1429 7.45452 82.579 7.45452 85.6071V96.5357C7.45452 99.5638 9.89069 102 12.9188 102H14.7402C34.867 102 51.1688 85.6982 51.1688 65.5714V10.9286C51.1688 4.89509 46.2737 0 40.2402 0H11.0974C5.0639 0 0.168808 4.89509 0.168808 10.9286V40.0714C0.168808 46.1049 5.0639 51 11.0974 51ZM76.6688 51H94.8831V65.5714C94.8831 73.6085 88.3487 80.1429 80.3117 80.1429H78.4902C75.4621 80.1429 73.0259 82.579 73.0259 85.6071V96.5357C73.0259 99.5638 75.4621 102 78.4902 102H80.3117C100.438 102 116.74 85.6982 116.74 65.5714V10.9286C116.74 4.89509 111.845 0 105.812 0H76.6688C70.6353 0 65.7402 4.89509 65.7402 10.9286V40.0714C65.7402 46.1049 70.6353 51 76.6688 51Z" fill="#16B6DF"/>
</svg>
`

function Widget() {
  const [quote, setQuote] = useSyncedState('quote-text', '')
  const [author, setAuthor] = useSyncedState('author-author', '')

  function fetchData() {
    return new Promise<void>(resolve => {
      figma.showUI(__html__, { visible: false })
      figma.ui.postMessage({ type: 'networkRequest' })

      figma.ui.onmessage = async ({ authorName, quoteContent }) => {
        setAuthor(authorName)
        setQuote(quoteContent)

        resolve()
      }
    })
  }

  // Initialize the widget with a random quote
  useEffect(() => {
    // Stop useEffect from firing again after the state changes
    if (!quote.length && !author.length) {
      waitForTask(fetchData())
    }
  })

  usePropertyMenu(
    [
      {
        itemType: 'action',
        propertyName: 'generate',
        tooltip: 'Generate',
        icon: `<svg width="22" height="15" viewBox="0 0 22 15" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd" clip-rule="evenodd" d="M11.9026 1.43168C12.1936 1.47564 12.4822 1.54098 12.7663 1.62777L12.7719 1.62949C14.0176 2.0114 15.109 2.78567 15.8858 3.83854L15.8918 3.84665C16.5473 4.73808 16.9484 5.78867 17.058 6.88508L14.0863 4.88858L13.3259 6.02047L17.3852 8.74774L17.9079 9.09894L18.2994 8.60571L21.0056 5.19662L19.9376 4.34879L18.3531 6.34479C18.3424 6.27511 18.3306 6.20563 18.3179 6.13636C18.1135 5.02233 17.6601 3.96334 16.9851 3.04274L16.9791 3.03462C16.0303 1.74427 14.6956 0.794984 13.1714 0.326388L13.1658 0.32466C12.8171 0.217755 12.4627 0.137298 12.1055 0.0832198C10.899 -0.0994351 9.66061 0.0188515 8.50099 0.435448L8.4947 0.437711C7.42511 0.823053 6.46311 1.44778 5.6774 2.25801C5.38576 2.55876 5.11841 2.88506 4.87886 3.23416C4.85856 3.26376 4.83845 3.29351 4.81854 3.32343L5.94262 4.08294L5.94802 4.07484C5.96253 4.0531 5.97717 4.03146 5.99195 4.00993C6.71697 2.95331 7.75331 2.15199 8.95541 1.72013L8.9617 1.71788C9.33245 1.58514 9.71301 1.48966 10.098 1.43156C10.6957 1.34135 11.3039 1.34123 11.9026 1.43168ZM3.70034 6.39429L0.994141 9.80338L2.06217 10.6512L3.64663 8.65521C3.65741 8.72489 3.66916 8.79437 3.68187 8.86364C3.88627 9.97767 4.33964 11.0367 5.01467 11.9573L5.02063 11.9654C5.96945 13.2557 7.30418 14.205 8.82835 14.6736L8.83398 14.6753C9.18281 14.7823 9.53732 14.8628 9.89464 14.9168C11.101 15.0994 12.3393 14.9811 13.4988 14.5646L13.5051 14.5623C14.5747 14.1769 15.5367 13.5522 16.3224 12.742C16.614 12.4413 16.8813 12.115 17.1209 11.7659C17.1412 11.7363 17.1613 11.7065 17.1812 11.6766L16.0571 10.9171L16.0518 10.9252C16.0372 10.9469 16.0225 10.9686 16.0078 10.9902C15.2827 12.0467 14.2464 12.848 13.0444 13.2799L13.0381 13.2821C12.6673 13.4149 12.2868 13.5103 11.9018 13.5684C11.3041 13.6587 10.6958 13.6588 10.0971 13.5683C9.8062 13.5244 9.51754 13.459 9.23347 13.3722L9.22784 13.3705C7.98212 12.9886 6.89078 12.2143 6.11393 11.1615L6.10795 11.1534C5.45247 10.2619 5.05138 9.21133 4.94181 8.11492L7.91342 10.1114L8.6739 8.97953L4.61459 6.25226L4.09188 5.90106L3.70034 6.39429Z" fill="white"/>
          </svg>
          `,
      },
    ],
    () => fetchData(),
  )

  return (
    <AutoLayout
      verticalAlignItems={'start'}
      horizontalAlignItems={'center'}
      direction={'horizontal'}
      fill={'#FFFFFF'}
      height={'hug-contents'}
      width={'hug-contents'}
      padding={{
        vertical: 47,
        horizontal: 61
      }}
      spacing={54}
      name={'Quote'}
    >
      <SVG src={leftQuotationSvgSrc} name={'LeftQuotationMark'} />
      <AutoLayout
        verticalAlignItems={'end'}
        horizontalAlignItems={'start'}
        direction={'vertical'}
        height={'hug-contents'}
        width={'hug-contents'}
        padding={{
          vertical: 0,
          horizontal: 0
        }}
        spacing={10}
        name={'QuoteContent'}
      >
        <Text
          fontFamily={'Lora'}
          fontSize={36}
          width={700}
          fill={'#545454'}
          fontWeight={'normal'}
          height={'hug-contents'}
          name={'QuoteText'}
        >
          {quote}
        </Text>
        <Text
          fontFamily={'Raleway'}
          fontWeight={'bold'}
          fontSize={26}
          width={700}
          fill={'#16B6DF'}
          height={'hug-contents'}
          textCase={'upper'}
          name={'QuoteAuthor'}
        >
          — {author}
        </Text>
      </AutoLayout>
      <SVG src={rightQuotationSvgSrc} name={'RightQuotationMark'} />
    </AutoLayout>
  )
}

widget.register(Widget)
