export const asyncTimeout = <T>(fn: () => Promise<T>, errorMessage: string, ms: number = 10000) => {
  return new Promise<T>((resolve, reject) => {
    (async () => {
      const timeoutId = setTimeout(() => {
        reject(new Error(errorMessage));
      }, ms);

      const result = await fn();
      clearTimeout(timeoutId);
      resolve(result);
    })();
  });
};
