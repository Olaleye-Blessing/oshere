import { FC } from "react";

interface LoadingIndicatorProps {
  dataCy?: string;
}

const LoadingIndicator: FC<LoadingIndicatorProps> = ({
  dataCy = "loading",
}) => {
  return <div data-cy={dataCy}>Loading...</div>;
};

export default LoadingIndicator;
