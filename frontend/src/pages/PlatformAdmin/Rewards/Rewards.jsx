import AdminPageHeader from '../../../components/ui/AdminPageHeader/AdminPageHeader'

const RewardTypes = () => (
  <ul>
    <li>Badges</li>
    <li>Medals</li>
    <li>Ribbons</li>
    <li>Stars</li>
    <li>Certificates</li>
    <li>Trophies</li>
    <li>Vouchers</li>
    <li>Coupons</li>
    <li>Gift cards</li>
    <li>Merchandise</li>
    <li>Points</li>
    <li>Discounts</li>
  </ul>
)

const Rewards = () => {
  return (
    <div className="rewards-page">
        <AdminPageHeader
          eyebrow="Platform Admin"
          title="Rewards"
          description="Here you can manage and view all the rewards for your platform."
        />
        <section className="rewards-content">
          <p>Rewards contains a list of all the rewards available for your platform.</p>
          <p>These include:</p>
          <RewardTypes />
          <p>These rewards can be used to motivate and engage your users.</p>
          <p>They can be redeemed by your users to get something in return.</p>
          <p>School Admin can buy them from the marketplace.</p>
          <p>Platform Admin can make and add them to the marketplace.</p>
        </section>
    </div>
  )
}

export default Rewards