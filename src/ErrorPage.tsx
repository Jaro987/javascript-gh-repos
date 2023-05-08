import { useRouteError } from "react-router-dom";

 function ErrorPage() {
  const error: unknown = useRouteError();
  console.error(error);

  return (
    <div id="error-page" className="center">
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{(error as Error)?.name || (error as Error)?.message}</i>
      </p>
    </div>
  );
}

export default ErrorPage;
