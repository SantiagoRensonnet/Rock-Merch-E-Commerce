import notFoundImg from "../assets/images/page-not-found.png";
export const Error404 = () => {
  return (
    <main className="main-container justify-end">
      <h1 className="text-neutral-100 text-2xl font-bold opacity-70 absolute top-[7.5rem] cursor-default">
        PAGE NOT FOUND
      </h1>
      <div
        className="w-3/4 max-w-2xl aspect-square bg-no-repeat bg-cover flex justify-center opacity-60 mix-blend-lighten"
        style={{ backgroundImage: `url(${notFoundImg})` }}
      >
        {" "}
      </div>
    </main>
  );
};
