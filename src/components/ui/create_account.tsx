
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation } from 'react-query';
import { z } from "zod"
import axios from 'axios';
import FloatingLabelInput from "./input";

const loginSchema = z.object({
    fullName: z.string().min(1, "Full name is required"),
    phoneNumber: z
      .string()
      .min(10, "Phone number must be at least 10 digits")
      .regex(/^\d+$/, "Phone number must contain only digits"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    companyName: z.string().optional(),
    isAgency: z.enum(["yes", "no"], {
      required_error: "Please select if you are an agency",
    }),
  });

type LoginFormValues = z.infer<typeof loginSchema>

const CreateAccount : React.FC = () => {

  const {register,handleSubmit,formState: { errors,isValid },reset} = useForm<LoginFormValues>({
        resolver: zodResolver(loginSchema),
        mode: "onChange",
        defaultValues: {
        fullName: "",
        phoneNumber: "",
        email: "",
        password: "",
        companyName: "",
        isAgency: "yes",
        },
    })


   


    const submitLogin = async (loginData: LoginFormValues) => {
      try {
        console.log("request is sent")
        const response = await axios.post('http://localhost:3001/api/auth/register', loginData);
        return response.data; 
      } catch (error) {
        throw new Error("Login failed, please try again.");
      }
    };


    const { mutate, isLoading } = useMutation(submitLogin, {
      onSuccess: (data) => {
        localStorage.setItem("userToken", data.token || ""); 
        reset();
      },
      onError: () => {

            },
    });
  
  const onSubmit = (data: LoginFormValues) => {
    mutate(data); // trigger the mutation (send data to backend)
  };



  return (
    <div className="w-full h-full flex flex-col justify-center items-center">
    <div className="w-[320px] h-[314px] flex flex-col items-center justify-start gap-6">
    <div className="flex flex-col items-center justify-center gap-2">
      <h1 className="font-jakarta font-medium text-[28px] leading-[38px] text-[#1D2226]">Create your Popx account</h1>    </div>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 flex flex-col items-center justify-center ">


       <div className="flex flex-col gap-6">
        <FloatingLabelInput name="fullName" type="text" placeholder="Marry Doe" register={register} errors={errors} label="Full Name" required={true} />
        <FloatingLabelInput name="phoneNumber" type="text" placeholder="XXXXXXXXXX" register={register} errors={errors} label="Phone number" required={true} />
        <FloatingLabelInput name="email" type="text" placeholder="Enter email address" register={register} errors={errors} label="Email address" required={true} />
        <FloatingLabelInput name="password" type="password" placeholder="Enter password" register={register} errors={errors} label="Password" required={true} />
        <FloatingLabelInput name="companyName" type="text" placeholder="Enter company name(optional)" register={register} errors={errors} label="Company name" required={false} />
        <div className="gap-3 flex flex-col">

        <label className="text-sm text-[#1D2226] block">
            Are you an Agency? <span className="text-red-500">*</span>
        </label>
        <div className="flex gap-6">
                <label className="flex items-center gap-2">
                <input
                    type="radio"
                    value="yes"
                    {...register("isAgency", { required: true })}
                    className="form-radio text-purple-600"
                />
                Yes
                </label>
                <label className="flex items-center gap-2">
                <input
                    type="radio"
                    value="no"
                    {...register("isAgency", { required: true })}
                    className="form-radio text-purple-600"
                />
                No
                </label>
                </div>
            </div>
        </div>

        <button className={` w-full border-[1px] rounded-[8px]  ${isValid ? "bg-purple-600 hover:bg-[#1e2340] cursor-pointer" : "bg-[#CBCBCB] cursor-not-allowed hover:bg-[#CBCBCB]"} hover:bg-[#1e2340] py-[16px] px-[24px] text-white shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)] `}>
          {isLoading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>

    
    </div>
  )
}


export default CreateAccount
