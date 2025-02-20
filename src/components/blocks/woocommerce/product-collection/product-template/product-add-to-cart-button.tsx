import { ParsedBlock } from '@src/components/blocks';
import { useContentContext } from '@src/context/content-context';
import { v4 } from 'uuid';

import { Spinner } from '@components/svg/spinner';
import { useSiteContext } from '@src/context/site-context';
import { useAddToCartMutation } from '@src/lib/actions/add-to-cart';
import { cn } from '@src/lib/helpers/helper';
import Link from 'next/link';
import { ArrowRightIcon } from '@heroicons/react/20/solid';

export const ProductAddToCartButton = ({ block }: { block: ParsedBlock }) => {
  const { data: product } = useContentContext();
  const className = block.attrs.className;

  const {
    fetchCart,
    miniCartState: [, setMiniCartOpen],
  } = useSiteContext();

  const getAddToCartQueryVariables = () => {
    if (!product.id) {
      return;
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const inputVariables: any = {
      clientMutationId: v4(), // Generate a unique id.
      productId: parseInt(product.id, 10),
      quantity: 1,
    };

    return inputVariables;
  };

  const [addToCart, { loading }] = useAddToCartMutation({
    variables: {
      input: getAddToCartQueryVariables(),
    },
    onCompleted: () => {
      fetchCart();
      setMiniCartOpen((prev) => !prev);
    },
  });

  const handleAddToCart = async () => {
    await addToCart();
  };

  const addToCartLoadingIndicator = () => {
    return (
      <>
        <Spinner className="text-black" />
        Adding to cart...
      </>
    );
  };

  const unavailable = product?.stockStatus === 'outofstock';
  const defaultBtnClasses = ['add-to-cart-button'];

  const ctaClasses = cn(
    defaultBtnClasses.join(' '),
    {
      'opacity-50': loading || unavailable,
    },
    className
  );

  if (product.permalink && product.shouldDisplaySelectOptionsText) {
    return (
      <Link
        href={product.permalink}
        className={ctaClasses}
      >
        Select Options <ArrowRightIcon className="w-4 h-4 md:w-6 md:h-6 inline-block" />
      </Link>
    );
  }

  return (
    <div className="add-to-cart-container">
      <button
        disabled={loading || unavailable}
        className={ctaClasses}
        onClick={handleAddToCart}
      >
        {loading ? addToCartLoadingIndicator() : 'ADD TO CART'}
        <ArrowRightIcon className="w-4 h-4 md:w-6 md:h-6" />
      </button>
    </div>
  );
};
