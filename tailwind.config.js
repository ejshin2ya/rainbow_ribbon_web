/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}', // React 파일들이 TailwindCSS를 적용할 수 있도록 경로 설정
  ],
  theme: {
    extend: {
      fontFamily: {
        pretendard: ['Pretendard', 'Roboto'],
        roboto: ['Roboto', 'Roboto'],
      },
      colors: {
        reborn: {
          white: '#fff',
          white60: '#ffffff99',
          gray0: '#f7f7f7',
          gray1: '#ebebeb',
          gray2: '#d6d6d6',
          gray2_2: '#cecece',
          gray3: '#adadad',
          gray4: '#858583',
          gray5: '#5c5c5a',
          gray6: '#454545',
          gray7: '#2e2e2e',
          gray8: '#181717',
          orange0: '#fff9f7',
          orange1: '#ffede7',
          orange2: '#f8ccb1',
          orange2_2: '#fc9974',
          orange2_3: '#e65c2d',
          orange2_4: '#cc5228',
          orange3: '#ff6632',
          orange4: '#ff3d00',
          orange5: '#ff9432',
          blue0: '#e7f6fd',
          blue0_1: '#d1eefb',
          blue0_2: '#71b2ff',
          blue1: '#238df7',
          blue2: '#0369a1',
          blue3: '#55696e',
          blue4: '#b2c4c7',
          pink: '#e2d0ca',
          pink2: '#dea6a6',
          brown: '#d68b68',
          yellow1: '#fef6e7',
          yellow2: '#fdeef1',
          yellow3: '#ffde00',
          red: '#e74e1a',
        },
      },
      spacing: {
        vh: '1vh',
        vw: '1vw',
        pc: '1%',
      },
    },
  },
  plugins: [],
};
