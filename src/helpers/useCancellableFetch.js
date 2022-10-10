import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const customFetch = () => {
  const controller = new AbortController();
  const { signal } = controller;

  const cancellableFetch = (url, option) => fetch(url, { ...option, signal });
  const abort = () => controller.abort();

  return [cancellableFetch, abort];
};

export const useCancellableFetch = (url, option, body) => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const [cancellableFetch, abort] = customFetch();

    if (body) {
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
        })();
      } catch (error) {
        error.name === "AbortError"
          ? setError('Request Aborted!')
          : setError(error)
      } finally {
        setIsLoading(false);
      }
    }

    return () => {
        abort();
        console.log('aborted!');
    }
  }, [body]);

  return [isLoading, error];
};