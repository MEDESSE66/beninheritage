/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Encyclopedia from './pages/Encyclopedia';
import Services from './pages/Services';
import Opportunities from './pages/Opportunities';
import Entertainment from './pages/Entertainment';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="encyclopedie" element={<Encyclopedia />} />
          <Route path="services" element={<Services />} />
          <Route path="opportunites" element={<Opportunities />} />
          <Route path="divertissement" element={<Entertainment />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
