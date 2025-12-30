import { Loader } from "./Loader";

export function RouteFallback() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <Loader />
    </div>
  );
}


