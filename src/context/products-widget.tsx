import React, { useEffect, useMemo, useState } from 'react';
import { ParsedBlock } from '@src/components/blocks';
import { BlockAttributes } from '@src/lib/block/types';
import createCtx from '@src/context/create-ctx';
import TSTaxonomy from '@src/lib/typesense/taxonomy';
import { ITSProductQueryResponse, ITSTaxonomyProductQueryVars } from '@src/lib/typesense/types';
import { useFetchTsTaxonomyProducts } from '@src/lib/hooks';
import { Product } from '@src/models/product';
import { getAttributeValue } from '@src/lib/block';

export type ProductsWidgetContextValue = {
  block: ParsedBlock;
  loading: boolean;
  isFetched: boolean;
  products: Product[];
  queryVars: [
    ITSTaxonomyProductQueryVars,
    React.Dispatch<React.SetStateAction<ITSTaxonomyProductQueryVars>>
  ];
  data?: ITSProductQueryResponse;
};

export type ProductsWidgetContextProps = {
  children?: React.ReactNode;
  block: ParsedBlock;
};

export const [useProductsWidgetContext, ProductsWidgetContext] =
  createCtx<ProductsWidgetContextValue>();

export const ProductsWidgetContextProvider = (props: ProductsWidgetContextProps) => {
  const { block, children } = props;
  const attribute = props.block.attrs as BlockAttributes;
  const htmlAttributes = attribute.htmlAttributes ?? [];

  const defaultSortBy = TSTaxonomy.sortOptions()[0];
  const attributePerpage = getAttributeValue(htmlAttributes, 'data-per-page');
  const perPage = attributePerpage ? parseInt(attributePerpage) : 4;

  const attributeOnSale = getAttributeValue(htmlAttributes, 'data-on-sale');
  const onSale = attributeOnSale ? attributeOnSale : undefined;

  const defaultQueryVars: ITSTaxonomyProductQueryVars = TSTaxonomy.getDefaultTsQueryVars();
  const productQueryVars: ITSTaxonomyProductQueryVars = {
    ...defaultQueryVars,
    sortBy: defaultSortBy?.value as string,
    onSale: onSale,
    perPage: perPage,
  };

  const [tsQueryVars, setTsQueryVars] = useState(productQueryVars);
  const cachedTsQueryVars = useMemo(() => tsQueryVars, [tsQueryVars]);

  const [productsData, setProductsData] = useState<Product[]>([]);

  const { loading, data, isFetched } = useFetchTsTaxonomyProducts(cachedTsQueryVars, true);

  useEffect(() => {
    if (typeof data !== 'undefined') {
      setProductsData((prevProducts) => {
        // Return new data
        return Product.buildFromResponseArray(data?.products);
      });
    }
  }, [data]);

  const providerValue: ProductsWidgetContextValue = {
    block: block,
    loading,
    products: productsData,
    isFetched,
    queryVars: [tsQueryVars, setTsQueryVars],
    data,
  };

  return <ProductsWidgetContext value={providerValue}>{children}</ProductsWidgetContext>;
};
