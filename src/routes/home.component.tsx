//Libraries

//Components
import CategoryList from "../components/category-list/category-list.component";
const Home = () => {
  const categories = [
    {
      id: 1,
      title: "HATS",
      imageURL:
        "https://images.unsplash.com/photo-1613160766294-cf9a6c0d2f6a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
    },
    {
      id: 2,
      title: "JACKETS",
      imageURL:
        "https://images.unsplash.com/photo-1619378448271-49616680044b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
    },
    {
      id: 3,
      title: "SNICKERS",
      imageURL:
        "https://images.unsplash.com/photo-1619378881376-9776d23e28e2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
    },
    {
      id: 4,
      title: "WOMEN",
      imageURL:
        "https://images.unsplash.com/photo-1619065513120-ad804c3f5e22?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
    },
    {
      id: 5,
      title: "MEN",
      imageURL:
        "https://images.unsplash.com/photo-1613160780608-9d5c8bfa239f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
    },
  ];
  return (
    <main className="main-container">
      <CategoryList categories={categories} />
    </main>
  );
};
export default Home;
