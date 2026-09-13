import { useRouteError } from "react-router";

const Error = () => {
  const err = useRouteError();
  console.log(err);

  return (
    <div className="text-red-500 text-bold text-3xl mt-20 text-center *:first-letter:uppercase">
      <h1 className="mb-4">Oops!!!</h1>
      <h2>
        {err.status} : {err.statusText}
      </h2>
    </div>
  );
};

export default Error;
