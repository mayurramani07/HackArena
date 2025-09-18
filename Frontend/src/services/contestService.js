
export const loadContests = async (setContests, setLoading) => {
  try {
    const res = await fetch("http://localhost:7000/api/contests", {
      credentials: "include",
    });
    if (!res.ok) throw new Error("Failed to fetch contests");
    const data = await res.json();

    setContests(
      data.map((c) => ({
        ...c,
        bookmarked: c.reminder || false, 
        id: c.url,       
      }))
    );
  } catch (err) {
    console.error("Error fetching contests:", err);
  } finally {
    setLoading(false);
  }
};

export const handleBookmarkToggle = (id, contests, setContests) => {
  const updated = contests.map((c) =>
    c.id === id ? { ...c, bookmarked: !c.bookmarked } : c
  );
  setContests(updated);
};

export const handleVisitContest = (url, isLoggedIn, navigate) => {
  if (!isLoggedIn) return alert("Login required to view contest");
  window.open(url, "_blank");
};

export const checkUserAuth = async (setIsLoggedIn, setUser) => {
  try {
    const res = await fetch("http://localhost:7000/api/auth/check", {
      credentials: "include",
    });
    if (!res.ok) throw new Error("Auth check failed");
    const data = await res.json();
    setIsLoggedIn(data.loggedIn || false);
    if (setUser) setUser(data.user || null);
  } catch (err) {
    console.error("Error checking auth:", err);
    setIsLoggedIn(false);
    if (setUser) setUser(null);
  }
};
