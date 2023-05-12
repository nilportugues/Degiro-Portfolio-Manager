import Header from '@/components/Header';

export default function App({children}) {
  return (
    <div className="col-lg-8 mx-auto p-3 py-md-5">
      <Header />
      <main>
        {children}
      </main>
      <footer className="pt-5 my-5 text-muted border-top">
        Created by Gabriel Massadas
      </footer>
    </div>
  );
}
