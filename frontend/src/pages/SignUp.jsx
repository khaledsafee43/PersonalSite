import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signUpSchema } from "../schemas/authSchema";
import api from "../services/api";
export default function SignUp() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data) => {
    try {
      const { fullName, email, password } = data;
      const { data: signUpData, error } = await api.post("/auth/sigUp", {
        email: email.trim(),
        password,
        fullName: fullName.trim(),
      });
      if (error) {
        alert(error.message);
        return;
      }
      if(signUpData.user){
        alert(
          signUpData.session ? "Account Created Successfully":""
        )
        console.log(signUpData.user);
        
      }
    } catch (error) {
      console.error("Signup error:", error);
      alert("Unable to register. Please try again.");
    }
  };
  return (
    <div>
      <form>
        <label htmlFor="name">Name</label>
        <input type="text" />
      </form>
    </div>
  );
}
