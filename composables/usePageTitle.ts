export default function () {
  const pageTitle = useState('page', () => (''))

  const setPageTitle = (title: string) => {
    console.log('title update')
    pageTitle.value = title
  }

  return {
    pageTitle,
    setPageTitle,
  }
}
