import { fetchContests, checkAuth } from "../services/contestService";

export const loadContests = async (setContests, setLoading) => {
  setLoading(true);
  const data = await fetchContests();
  setContests(data);
  setLoading(false);
};

export const handleBookmarkToggle = (id, contests, setContests) => {
  setContests(
    contests.map((c) =>
      c.id === id ? { ...c, bookmarked: !c.bookmarked } : c
    )
  );
};

export const handleVisitContest = (url, isLoggedIn, navigate) => {
  if (isLoggedIn) window.open(url, "_blank", "noopener,noreferrer");
  else navigate("/login");
};

export const checkUserAuth = async (setIsLoggedIn) => {
  const loggedIn = await checkAuth();
  setIsLoggedIn(loggedIn);
};
