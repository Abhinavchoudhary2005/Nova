export const checkAuth = async () => {
  try {
    const token = localStorage.getItem("token");
    const response = await fetch(`${process.env.REACT_APP_API_KEY}admin`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${token}`,
      },
    });

    if (response.ok) {
      const data = await response.json();
      return data.isAuthenticated;
    }
    return false;
  } catch (error) {
    console.error("Error checking authentication status:", error);
    return false;
  }
};
