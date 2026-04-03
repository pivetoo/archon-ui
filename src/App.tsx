import { GlobalLoaderProvider, ThemeProvider, Toaster } from "./components/ui"
import { ExamplesCatalog } from "./examples"

function App() {
  return (
    <ThemeProvider>
      <GlobalLoaderProvider>
        <ExamplesCatalog />
        <Toaster />
      </GlobalLoaderProvider>
    </ThemeProvider>
  )
}

export default App
