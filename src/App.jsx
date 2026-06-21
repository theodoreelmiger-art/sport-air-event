import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout.jsx';
import SmoothScroll from './lib/SmoothScroll.jsx';

import Home from './pages/Home.jsx';
import About from './pages/About.jsx';
import Contact from './pages/Contact.jsx';
import ModernProducts from './pages/ModernProducts.jsx';
import Products from './pages/Products.jsx';
import Tente from './pages/Tente.jsx';
import TenteSurMesure from './pages/TenteSurMesure.jsx';
import SpiderTent from './pages/SpiderTent.jsx';
import ArchesGonflables from './pages/ArchesGonflables.jsx';
import ArchesSurMesure from './pages/ArchesSurMesure.jsx';
import ColonnesGonflables from './pages/ColonnesGonflables.jsx';
import ColonnesSurMesure from './pages/ColonnesSurMesure.jsx';
import Mobilier from './pages/Mobilier.jsx';
import Customization from './pages/Customization.jsx';
import Process from './pages/Process.jsx';
import Quality from './pages/Quality.jsx';
import Cgv from './pages/Cgv.jsx';
import GuideStructuresGonflables from './pages/GuideStructuresGonflables.jsx';
import NotFound from './pages/NotFound.jsx';

export default function App() {
  return (
    <SmoothScroll>
    <Layout>
      <Routes>
        <Route path="/" element={<Navigate to="/Home" replace />} />
        <Route path="/Home" element={<Home />} />
        <Route path="/About" element={<About />} />
        <Route path="/Contact" element={<Contact />} />
        <Route path="/ModernProducts" element={<ModernProducts />} />
        <Route path="/Products" element={<Products />} />
        <Route path="/Tente" element={<Tente />} />
        <Route path="/TenteSurMesure" element={<TenteSurMesure />} />
        <Route path="/SpiderTent" element={<SpiderTent />} />
        <Route path="/ArchesGonflables" element={<ArchesGonflables />} />
        <Route path="/ArchesSurMesure" element={<ArchesSurMesure />} />
        <Route path="/ColonnesGonflables" element={<ColonnesGonflables />} />
        <Route path="/ColonnesSurMesure" element={<ColonnesSurMesure />} />
        <Route path="/Mobilier" element={<Mobilier />} />
        <Route path="/Customization" element={<Customization />} />
        <Route path="/Process" element={<Process />} />
        <Route path="/Quality" element={<Quality />} />
        <Route path="/cgv" element={<Cgv />} />
        <Route path="/guide-structures-gonflables" element={<GuideStructuresGonflables />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Layout>
    </SmoothScroll>
  );
}
