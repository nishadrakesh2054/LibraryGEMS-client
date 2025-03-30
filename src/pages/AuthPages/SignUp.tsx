import PageMeta from "../../components/common/PageMeta";
import AuthLayout from "./AuthPageLayout";
import SignUpForm from "../../components/auth/SignUpForm";

export default function SignUp() {
  return (
    <>
      <PageMeta
        title="Gems LMS  SignUp Dashboard "
        description="This is Gems LMS  SignIn Page"
      />
      <AuthLayout>
        <SignUpForm />
      </AuthLayout>
    </>
  );
}
