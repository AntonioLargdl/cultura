import styles from '.';

interface Steps {
    number: string,
    text: string,
}

const StartSteps = ({ number, text }:Steps) => (
  <div className={`${styles.flexCenter} flex-row`}>
    <div
      className={`${styles.flexCenter} md:w-[70px] w-[40px] md:h-[70px] h-[40px] rounded-[24px] bg-[#323F5D]`}
    >
      <p className="font-bold text-[20px] text-white">
        {number}
      </p>
    </div>
    <p className="flex-1 ml-[30px] font-normal text-[18px] text-[#B0B0B0] leading-[32.4px]">
      {text}
    </p>
  </div>
);

export default StartSteps;