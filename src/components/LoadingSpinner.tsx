export default function LoadingSpinner() {
    return (
      <div className="absolute z-50 top-1/2 left-1/2 flex justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }