import React from 'react'
import { Accordion } from 'semantic-ui-react'

const level1Panels = [
  { key: 'panel-1a', title: 'Newly Married couples', content: 'Book an appointment by filling all necessary details, your marriage must be approve by a valid approver with wife signature. Then upload engagement photo and vow vedio.' },
  { key: 'panel-ba', title: 'Divorce Case', content: 'You have to claim an divorce file in the ethereum then you can agin marry according to the ethereum rule.' },
  { key: 'panel-ca', title: 'Marriage Fees', content: 'You have to pay 0.1 ethers as registry fees.' },
]

const Level1Content = (
  <div>
    Marriage Registry procedure
    <Accordion.Accordion panels={level1Panels} />
  </div>
)

const level2Panels = [
  { key: 'panel-2a', title: 'Upto 2 children', content: 'You have to upload all the necessary details and pay 0.1 ethers as registry cost.' },
  { key: 'panel-2b', title: 'More then 2 children', content: 'You have to pay 1 ethers for having more then 2 children.' },
]

const Level2Content = (
  <div>
    Child Registry procedure
    <Accordion.Accordion panels={level2Panels} />
  </div>
)

const level3Panels = [
  { key: 'panel-3a', title: 'Marriage', content: 'Government will verify that you are allready married or not, and will verify if the marriage is forced or not by the vedio doccument submitted.' },
  { key: 'panel-3b', title: 'Child', content: 'Government will verify that you are married/not and will pose fine if you are having more than two children, controlling child birth.' },
]

const Level3Content = (
  <div>
    Fraud Control
    <Accordion.Accordion panels={level3Panels} />
  </div>
)

const rootPanels = [
  { key: 'panel-1', title: 'Marriage Registry', content: { content: Level1Content } },
  { key: 'panel-2', title: 'Child Registry', content: { content: Level2Content } },
  { key: 'panel-3', title: 'Government Functions', content: { content: Level3Content } },
]

const Accordiction = () => (
  <Accordion fluid defaultActiveIndex={0} panels={rootPanels} styled />
)

export default Accordiction;
