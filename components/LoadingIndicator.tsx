import { FC } from "react";

interface LoadingIndicatorProps {
  dataCy?: string;
  className?: string;
}

const LoadingIndicator: FC<LoadingIndicatorProps> = ({
  dataCy = "loading",
  className = "",
}) => {
  return (
    <div data-testid={dataCy} data-cy={dataCy} className={className}>
      Loading...
    </div>
  );
};

export default LoadingIndicator;
