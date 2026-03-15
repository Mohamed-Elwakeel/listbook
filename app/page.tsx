import { Container } from '@/components/layout/container';
import { MediaList } from '@/components/features/media-list';
import { SearchCommand } from '@/components/features/search-command';

export default function Home() {
  return (
    <section className="pt-6 pb-12">
      <Container>
        {/* The main "Surface" container */}
        <div className="bg-surface text-surface-foreground relative min-h-[600px] w-full overflow-hidden rounded-4xl p-8 shadow-2xl">
          <header className="mb-8 flex items-end justify-between">
            <div>
              <h1 className="text-4xl font-bold tracking-tight">Your Collection</h1>
              <p className="text-muted-foreground mt-2">Track your books, films, and games in one place.</p>
            </div>
            {/* We will put an "Add" button here later */}
          </header>

          <SearchCommand />
          {/* This component handles all the items */}
          <MediaList />
        </div>
      </Container>
    </section>
  );
}
