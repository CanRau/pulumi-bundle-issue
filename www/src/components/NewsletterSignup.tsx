// todo: inspiration https://psyche.co/ideas/why-some-of-the-smartest-people-can-be-so-very-stupid
// todo: maybe upgrade to Convertkit https://app.convertkit.com/
// OR probably go straight to custom solution 🤓😍
export const NewsletterSignup = () => (
  <div
    id="revue-embed"
    className="flex flex-col w-full mx-auto my-6 transition duration-500 ease-in-out transform lg:w-96 md:w-1/2 md:mt-0"
  >
    <form
      action="https://www.getrevue.co/profile/CanRau/add_subscriber"
      method="post"
      id="revue-form"
      name="revue-form"
      target="_blank"
      className="flex flex-col w-full mx-auto transition duration-500 ease-in-out transform"
    >
      <div className="revue-form-group relative mt-4">
        <label htmlFor="member_email" className="leading-7 text-nord4">
          Email address
        </label>
        <input
          className="revue-form-field w-full px-2 py-1 mt-1 text-nord3 transition duration-500 ease-in-out transform border-transparent rounded-lg bg-nord4 focus:border-blueGray-500 focus:bg-white focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2"
          placeholder="Your email address..."
          type="email"
          name="member[email]"
          id="member_email"
        />
      </div>
      {/* <div className="revue-form-group relative mt-4">
        <label htmlFor="member_first_name" className="leading-7 text-nord4">
          First name <span className="optional">(Optional)</span>
        </label>
        <input
          className="revue-form-field w-full px-2 py-1 mt-1 text-nord3 transition duration-500 ease-in-out transform border-transparent rounded-lg bg-nord4 focus:border-blueGray-500 focus:bg-white focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2"
          placeholder="First name... (Optional)"
          type="text"
          name="member[first_name]"
          id="member_first_name"
        />
      </div> */}
      <div className="revue-form-actions inline-flex flex-wrap items-center justify-between mt-4">
        <button
          type="submit"
          name="member[subscribe]"
          id="member_submit"
          className="px-4 py-2 my-2 font-medium w-full text-white transition duration-500 ease-in-out transform bg-nord14 border-nord7 rounded-md focus:shadow-outline focus:outline-none focus:ring-2 ring-offset-current ring-offset-2 hover:bg-blue-800"
        >
          Subscribe
        </button>
      </div>
      <div className="revue-form-footer text-sm mt-4">
        By subscribing, you agree with Revue’s{" "}
        <a target="_blank" href="https://www.getrevue.co/terms" rel="noreferrer noopener">
          Terms of Service
        </a>{" "}
        and{" "}
        <a target="_blank" href="https://www.getrevue.co/privacy" rel="noreferrer noopener">
          Privacy Policy
        </a>
        .
      </div>
    </form>
  </div>
);
