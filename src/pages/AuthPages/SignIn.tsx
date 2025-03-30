import PageMeta from "../../components/common/PageMeta";
import AuthLayout from "./AuthPageLayout";
import SignInForm from "../../components/auth/SignInForm";

export default function SignIn() {
  return (
    <>
      <PageMeta
        title="Gems LMS  SignIn Dashboard "
        description="This is Gems LMS  SignIn Page"
      />
      <AuthLayout>
        <SignInForm />
      </AuthLayout>
    </>
  );
}
