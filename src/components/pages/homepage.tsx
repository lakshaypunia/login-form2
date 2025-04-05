import React from "react";
import { usePageNavigation } from "../../hooks/usenavigation";




const Homepage : React.FC = () => {

    const { goToLogin ,goToCreateAccount } = usePageNavigation();

    return (<div className="w-full flex flex-col justify-center items-center bg-white h-screen">
        <div className="md:w-full sm:w-[320px] h-fit fixed bottom-0 flex flex-col justify-center items-center gap-6 pb-10">
            <div className="flex flex-col items-center justify-center gap-2">
            <h1 className="font-jakarta font-medium text-[28px] leading-[38px] text-[#1D2226] w-full px-6 md:text-center">Welcome to PopX</h1>
            <p className="font-normal text-[18px] text-[#1D2226] opacity-3/5 w-full px-6 md:text-center">Lorem ipsum dolor sit amet, consectetur adipiscing elit sed</p>
        </div>
        <div className="flex flex-col items-center justify-center gap-2 w-[320px]">   
            <button onClick={goToCreateAccount}  className={`w-full  rounded-[8px]  hover:bg-[#1e2340] py-[16px] px-[24px] bg-[#6C25FF] font-bold text-white  `}>
                Create Account
            </button>
            <button onClick={goToLogin} className={`w-full rounded-[8px]  hover:bg-[#1e2340] py-[16px] px-[24px] font-bold  bg-[#6C25FF4B]  text-black`}>
                Already Registered? Login
            </button>
        </div>
    </div>
    </div>)
};

export default Homepage;