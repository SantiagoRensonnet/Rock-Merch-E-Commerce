//Components
import SignUpForm from "../components/sign-up-form.component";
import SignInForm from "../components/sign-in-form.component";

export default function Authentication() {
  return (
    <main className="main-container">
      <section className="md:flex md:justify-between max-w-sm md:max-w-none w-8/12   md:w-11/12 lg:w-10/12 xl:w-9/12  2xl:w-7/12">
        <SignInForm />
        <SignUpForm />
      </section>
    </main>
  );
}
