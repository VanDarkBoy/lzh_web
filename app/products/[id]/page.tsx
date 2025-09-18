import ProductDetail from './ProductDetail';

interface ProductIdentifierCandidate {
  id?: unknown;
  productId?: unknown;
}

const DEFAULT_STATIC_IDS = Array.from({ length: 20 }, (_, index) => String(index + 1));

const isRecord = (value: unknown): value is Record<string, unknown> => {
  return typeof value === 'object' && value !== null;
};

const parseProductId = (value: unknown): string | null => {
  if (typeof value === 'number' && Number.isFinite(value)) {
    return Math.trunc(value).toString();
  }

  if (typeof value === 'bigint') {
    return value.toString();
  }

  if (typeof value === 'string') {
    const trimmed = value.trim();

    if (trimmed && /^\d+$/.test(trimmed)) {
      return trimmed;
    }
  }

  return null;
};

const collectIdsFromPayload = (payload: unknown): string[] => {
  const ids = new Set<string>();
  const addId = (candidate: unknown) => {
    const parsed = parseProductId(candidate);

    if (parsed) {
      ids.add(parsed);
    }
  };

  if (Array.isArray(payload)) {
    payload.forEach((item) => {
      if (isRecord(item)) {
        const record = item as ProductIdentifierCandidate;
        addId(record.id);
        addId(record.productId);
      } else {
        addId(item);
      }
    });
    return Array.from(ids);
  }

  if (isRecord(payload)) {
    Object.entries(payload).forEach(([key, value]) => {
      addId(key);

      if (isRecord(value)) {
        const record = value as ProductIdentifierCandidate;
        addId(record.id);
        addId(record.productId);
      }
    });
  }

  return Array.from(ids);
};

const fetchStaticProductIds = async (): Promise<string[]> => {
  const apiBase = process.env.NEXT_PUBLIC_API_BASE;

  if (!apiBase) {
    console.warn('NEXT_PUBLIC_API_BASE is not defined. Falling back to default product ids.');
    return DEFAULT_STATIC_IDS;
  }

  try {
    const response = await fetch(`${apiBase}/api/getAllProduct`, {
      // Ensure the request runs at build time without caching across builds.
      cache: 'no-store',
    });

    if (!response.ok) {
      console.warn('Failed to fetch product ids for static generation. Falling back to defaults.', response.status);
      return DEFAULT_STATIC_IDS;
    }

    const rawPayload: unknown = await response.json();
    const ids = collectIdsFromPayload(rawPayload);

    if (ids.length === 0) {
      console.warn('No product ids were found in the product list response. Falling back to defaults.');
      return DEFAULT_STATIC_IDS;
    }

    return ids;
  } catch (error) {
    console.error('Unable to generate static params for product pages. Falling back to defaults.', error);
    return DEFAULT_STATIC_IDS;
  }
};

export async function generateStaticParams() {
  const productIds = await fetchStaticProductIds();

  return productIds.map((id) => ({ id }));
}

export default function ProductPage({ params }: { params: { id: string } }) {
  return <ProductDetail productId={params.id} />;
}
