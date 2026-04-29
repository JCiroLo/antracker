import React from "react";

type UseBooleanOptions = {
  initialValue?: boolean;
  autoload?: boolean;
  autoloadDelay?: number;
};

const useBoolean = (options: UseBooleanOptions) => {
  const [value, setValue] = React.useState(options.initialValue ?? false);

  React.useEffect(() => {
    if (options.autoload) {
      const delay = options.autoloadDelay ?? 0;

      setTimeout(() => {
        setValue(true);
      }, delay);
    }
  }, [options]);

  return value;
};

export default useBoolean;
