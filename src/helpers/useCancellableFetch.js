import { useState } from "react";
import { useNavigate } from "react-router-dom";

const customFetch = () => {
  const controller = new AbortController();
  const { signal } = controller;

  const cancellableFetch = (url, option) => fetch(url, { ...option, signal });
  const abort = () => controller.abort();

  return [cancellableFetch, abort];
};

export const useCancellableFetch = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate(); // i think we need to use this cutome hook inside a memoized component then use the compoennt itself
  const [cancellableFetch, abort] = customFetch();

  const logIn = (url, option, body) => {
    if (body) {
      console.log("if");
      try {
        setIsLoading(true);

        //IIFE (Imediately Invoked Function Expression)
        (async () => {
          const response = await cancellableFetch(url, option);
          const data = await response.json();

          if (data === "success") {
            // setCurrentUser
            navigate("/");
          }
          setIsLoading(false);
        })();
      } catch (error) {
        error.name === "AbortError"
          ? console.log("Request Aborted!")
          : console.log('failed to fetch data!!', error);
      }
    }
  };

  return [isLoading, logIn, abort];
};
