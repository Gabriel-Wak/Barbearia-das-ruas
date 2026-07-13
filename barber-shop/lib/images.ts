const q = (id: string, w = 800) =>
  `https://images.unsplash.com/photo-${id}?w=${w}&q=80`;

export const images = {
  clipper: q("1770253980732-dfed1cfdfa43"),
  trimmer: q("1599351431202-1e0f0137899a"),
  tools: q("1761931403807-f33fc582b1f5"),
  razor: q("1522335789203-aabd1fc54bc9"),
  pomade: q("1775127741393-2b571811bb01"),
  shelf: q("1775127741799-b06306261a08"),
  spray: q("1598300042247-d088f8ab3a91"),
  brush: q("1521590832167-7bcbfaa6381f"),
  chair: q("1503951914875-452162b0f3f1"),
  mirror: q("1622286342621-4bd786c2447c"),
  barber: q("1580618672591-eb180b1a973f"),
  barberShop: q("1605497788044-5a32c7078486"),
  barberAction: q("1516975080664-ed2fc6a32937"),
  skincare: q("1556228720-195a672e8a03"),
  skincareJar: q("1616394584738-fc6e612e71b9"),
  cosmetics: q("1535585209827-a15fcdbc4c2d"),
  styling: q("1522337360788-8b13dee7a37e"),
};

export const categoryImages: Record<string, string> = {
  "maquinas-aparadores": images.clipper,
  "navalhas-laminas": images.razor,
  "pomadas-finalizadores": images.pomade,
  "escovas-pentes": images.tools,
  "equipamentos-barbearia": images.chair,
};

export const productImages: Record<string, string> = {
  "maquina-de-corte-pro-fade-x500": images.clipper,
  "aparador-de-barba-sculpt-t200": images.trimmer,
  "kit-navalha-reta-classica": images.razor,
  "laminas-duplo-fio-platinum-100un": images.tools,
  "pomada-modeladora-matte-fixacao-forte": images.pomade,
  "spray-texturizador-sea-salt": images.spray,
  "escova-de-cerdas-naturais-premium": images.brush,
  "kit-pentes-de-carbono-3-unidades": images.tools,
  "cadeira-de-barbeiro-hidraulica-elite": images.chair,
  "espelho-de-bancada-com-led": images.mirror,
  "aquecedor-de-espuma-profissional": images.barberShop,
  "balm-pos-barba-formula-refrescante": images.skincare,
};
