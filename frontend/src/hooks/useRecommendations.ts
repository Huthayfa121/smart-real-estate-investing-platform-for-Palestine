// Stub hook for demo - replace with actual implementation when backend is connected
export const useRecommendations = () => {
  return {
    data: null,
    isLoading: false,
    error: null,
  };
};

export const useRefreshRecommendations = () => {
  return {
    mutate: () => {},
    isLoading: false,
  };
};

