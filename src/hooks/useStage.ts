import { useState } from 'react';

interface UseStageProps {
  stages: { [key: string]: any };
  callback?: () => any;
  initial?: any;
}

export default function useStage(props: UseStageProps) {
  const { stages, callback, initial } = props;
  const [current, setCurrent] = useState<any>(initial);

  const setFunctions: { [key: string]: any } = {};
  Object.keys(stages).forEach((stage) => {
    setFunctions[stage] = () => {
      setCurrent(stages[stage]);
      if (callback) callback();
    };
  });

  return { current, set: setFunctions };
}
