


import Feed from '@components/Feed'

const Home = () => {
  return (
    <section className="w-full flex-center flex-col">
      <h1 className="head_text text-center">
        What is this page all about?
        <br className="max-md:hidden" />
        <span className='orange_gradient text-center'>
          Sharing AI powered prompts!
        </span>
      </h1>

      <p className="desc text-center">
        discover. create. share.
      </p>


      <Feed/>
    </section>
  )
}

export default Home
