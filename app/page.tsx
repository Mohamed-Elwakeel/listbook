import { Container } from '@/components/layout/container';
import { MediaList } from '@/components/features/media-list';
import { SearchCommand } from '@/components/features/search-command';
import { CategoryTabs } from '@/components/features/category-tabs';

export default function Home() {
  return (
    <section className="pt-8 pb-12">
      <Container>
        <div className="mx-auto max-w-4xl">
          <header className="mb-10">
            <h1 className="text-3xl font-semibold tracking-tight">Collection</h1>
            <p className="text-muted-foreground mt-1 text-sm">Organize your media diet.</p>
          </header>

          <div className="space-y-6">
            <CategoryTabs />
            <SearchCommand />
            <MediaList />
          </div>
        </div>
      </Container>
    </section>
  );
}
