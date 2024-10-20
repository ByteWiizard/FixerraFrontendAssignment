import {QueryClient,QueryClientProvider} from '@tanstack/react-query'
import {debounce} from 'lodash'
import { useState } from 'react'
import './App.css'

import Layout from "./components/layouts/Layout";
import Home from "./pages/Home";
import BigCard from "./components/ui/CardComponents/BigCard";
import Backdrop from "./components/ui/CardComponents/Backdrop";
function App() {
  
  const client = new QueryClient({
    defaultOptions:{
      queries:{
        refetchOnWindowFocus: false,
      },
    },
  });


  const [searchTerm, setSearchTerm] = useState("");
  const [bigCardIsOpen, setBigCardIsOpen] = useState(false);
  const [bigCardData, setBigCardData] = useState(null);

  function openBigCard(id, image) {
    setBigCardIsOpen(true);
    setBigCardData({ id, image });
  }

  function closeBigCard() {
    setBigCardIsOpen(false);
  }

  const debouncedSearch = debounce((value) =>{
    setSearchTerm(value);
  },300);

  return (
    <QueryClientProvider client={client}>
      <Layout onSearch={debouncedSearch}>
        <Home searchTerm={searchTerm} openBigCard={openBigCard} />
      </Layout>

      {bigCardIsOpen && <Backdrop closeBigCard={closeBigCard} />}
      {bigCardIsOpen && (
        <BigCard
          closeBigCard={closeBigCard}
          id={bigCardData.id}
          image={bigCardData.image}
        />
      )}
    </QueryClientProvider>
  )
}

export default App
