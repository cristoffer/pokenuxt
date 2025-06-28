export default function () {
  const pageTitle = useState('page', () => (''))

  const setPageTitle = (title: string) => {
    pageTitle.value = title
  }

  return {
    pageTitle,
    setPageTitle,
  }
}
