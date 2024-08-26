import React from 'react'

const packageList = [
  {
    name: 'Standard',
    price: 'Just 2,000',
    packages: [
      {
        heading: 'Effortless Selling',
        description: 'Let our dedicated staff handle your car post, ensuring a smooth experience from start to finish.',
      },
      {
        heading: 'Simplified Process',
        description: 'We manage the complexities, so you can focus on finding the right buyer.',
      },
    ],
  },
  {
    name: 'Premium ',
    price: 'Only 6,000',
    packages: [
      {
        heading: 'In-Depth Analytics',
        description: ' Gain exclusive access to view the number of views and favorites your post receives.',
      },
      {
        heading: 'Prime Visibility',
        description:
          "Your car post will be featured in the 'Highlight' section, drawing attention from potential buyers.",
      },
      {
        heading: 'Priority Advertising',
        description: 'Our team will prioritize your post in targeted ads, connecting you with the right audience.',
      },
    ],
  },
  {
    name: 'VIP  ',
    price: 'With 10,000',
    packages: [
      {
        heading: 'Compelling Descriptions',
        description: 'Enhance your listing with AI-generated, detailed, and attractive content that captivates buyers.',
      },
      {
        heading: 'Professional Verification',
        description:
          'Benefit from expert verification and consultation, boosting the trustworthiness and appeal of your post.',
      },
      {
        heading: 'Exclusive Tag',
        description: "Your post will proudly display the 'Powered by ExchangeCar' tag, increasing its credibility.",
      },
      {
        heading: 'Widespread Promotion',
        description:
          'Enjoy extended reach with advertising support across our social media platforms like Facebook and TikTok.',
      },
    ],
  },
]

const PackageItem = ({ heading, description }) => {
  return (
    <div className='flex flex-col justify-center gap-2'>
      <div className='text-center w-full font-semibold text-xl'>{heading}</div>
      <div className='text-gray-800'>{description}</div>
    </div>
  )
}

const Packages = () => {
  return (
    <div className='flex flex-col justify-center items-center gap-6'>
      <div className='text-center text-4xl font-semibold w-full'>
        <span className='text-[#f97316] font-extrabold'>ExchangeCar</span> Service Packages
      </div>
      <div className='grid grid-cols-3 gap-6'>
        {packageList.map((packageIt, index) => (
          <div
            key={'package-' + index + 1}
            className='flex flex-col gap-8 border-2 border-dashed rounded-xl p-6 max-w-[350px]'
          >
            <div className='text-center flex flex-col gap-4'>
              <h2 className='font-bold text-2xl'>{packageIt.name}</h2>
              <p className='text-4xl font-extrabold text-[#f97316]'>{packageIt.price}</p>
              <p className='text-gray-600 text-right font-semibold'>VND/Day</p>
            </div>
            <div className='flex flex-col gap-6'>
              {packageIt.packages.map((item, itemIndex) => (
                <PackageItem key={'item-' + itemIndex + 1} heading={item.heading} description={item.description} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Packages
