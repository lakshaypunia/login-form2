
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation } from 'react-query';
import { z } from "zod"
import axios from 'axios';
import FloatingLabelInput from "./input";
import { useNavigate } from "react-router-dom";
import Notification from "./notificatoin";
import { useEffect, useState } from "react";
const backendUrl = import.meta.env.VITE_Backend_URL;


const loginSchema = z.object({
  email: z.string().min(1, "User ID is required"),
  password: z.string().min(6, "Password must be at least 6 characters"),
})

type LoginFormValues = z.infer<typeof loginSchema>

const LoginForm : React.FC = () => {

  const navigate = useNavigate()


  const {register,handleSubmit,formState: { errors,isValid },reset} = useForm<LoginFormValues>({
        resolver: zodResolver(loginSchema),
        mode: "onChange",
        defaultValues: {
        email: "",
        password: "",
        },
    })

    const [notification, setNotification] = useState<{ message: string, success:boolean, visible: boolean }>({
      message : '',
      success : true ,
      visible: false,
    });



   


    const submitLogin = async (loginData: LoginFormValues) => {
      try {
        console.log("request is sent")
        const response = await axios.post(`${backendUrl}api/auth/signin`, loginData);
        return response.data; 
      } catch (error) {
        throw new Error("Login failed, please try again.");
      }
    };


    const { mutate, isLoading } = useMutation(submitLogin, {
      onSuccess: (data) => {
        setNotification({ message: data.message, success: data.success, visible: true });
        localStorage.setItem("userToken", JSON.stringify(data.user)); 
        reset();
        if (data.success){
          navigate(`/profile/${data.user.id}`);
        }
         // navigate to profile page after successful login
      },
      onError: () => {
        setNotification({ message: "Login failed! Backend might not be running.", success: false, visible: true });
            },
    });

    useEffect(() => {
      if (notification.visible) {
        const timer = setTimeout(() => {
          setNotification((prev) => ({ ...prev, visible: false }));
        }, 3000);
        return () => clearTimeout(timer);
      }
    }, [notification.visible]);
  
  const onSubmit = (data: LoginFormValues) => {
    mutate(data); // trigger the mutation (send data to backend)
  };



  return (
    <div className="w-full h-full flex flex-col justify-center items-center">
    <div className="w-[320px] h-[314px] flex flex-col items-center justify-start gap-6">
    <div className="flex flex-col items-center justify-center gap-2">
      <h1 className="font-jakarta font-medium text-[28px] leading-[38px] text-[#1D2226]">Sign in to your Popx account</h1>
      <p className="font-normal text-[18px] text-[#1D2226] opacity-3/5">Lorem ipsum dolor sit amet, consectetur adipiscing elit sed</p>
    </div>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 flex flex-col items-center justify-center">


       <div className="flex flex-col gap-6">
        <FloatingLabelInput name="email" type="text" placeholder="Enter email address" register={register} errors={errors} label="Email Address" required={true} />
        <FloatingLabelInput name="password" type="password" placeholder="Enter password" register={register} errors={errors} label="Password" required={true} />
        </div>

        <button className={`w-full border-[1px] rounded-[8px]  ${isValid ? "bg-purple-600 hover:bg-[#1e2340] cursor-pointer" : "bg-[#CBCBCB] cursor-not-allowed hover:bg-[#CBCBCB]"} hover:bg-[#1e2340] py-[16px] px-[24px] text-white shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)] `}>
          {isLoading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
    <Notification
        message={notification.message}
        success={notification.success}
        visible={notification.visible}
      />
    
    </div>
  )
}


export default LoginForm
