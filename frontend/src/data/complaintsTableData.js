const complaintGenerator = (id, complaintType , status , raisedBy , assignee , flatId)=>{

    return {
        id,
        complaintType,
        status,
        raisedBy,
        assignee,
        flatId
    }

}

const rows = [
    complaintGenerator(1,'electrical','pending','Lakshya Purwar','Ramu Kaka','A701'),
    complaintGenerator(2,'plumbing','resolved','Chodu Bhagatr','Shyamu Kaka','B701'),
    complaintGenerator(3,'carpenter','pending','Lakshya Purwar','Ramu Kaka','A701'),
    complaintGenerator(4,'plumbing','pending','Kem Khitij','Ramu Daku','D501'),
    complaintGenerator(5,'electrical','pending','Lakshya Purwar','Ramu Kaka','A201'),
    complaintGenerator(6,'carpenter','resolved','Lakshya Purwar','Ramu Kaka','E401'),
    complaintGenerator(7,'electrical','resolved','Chodumal','Bhalu Kkaa','A701'),
    complaintGenerator(8,'plumbing','pending','Lakshya Purwar','Ramu Kaka','A701'),
    complaintGenerator(9,'carpenter','resolved','Chuldeep','Ramu Kaka','E701'),
    complaintGenerator(10,'electrical','pending','Chuldeep','Ramu Kaka','A701'),
    complaintGenerator(11,'carpenter','resolved','Lakshya Purwar','Ramu Kaka','B101'),
]

export default rows;