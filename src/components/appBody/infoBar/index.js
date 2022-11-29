import { margin } from '@mui/system';
import React from 'react'
import { Link, useParams } from 'react-router-dom';
import { InfoBarContainer, InfoBarHeader, InfoBarBody} from "./InfoBar.styles"

const InfoBar = () => {
    const { id }  = useParams();
    let content = "";
    switch(id){
        case 'alumni relations office':
            content =  "office"
            break;
        case 'our policy':
            content = "policy"
            break;
        case 'give to ESUT':
            content = "give"
            break;
        case 'donations':
            content = "donation"
        break;

    }

    const donate = (e) => {
        e.preventDefault();
        alert("Oops! Payment gateway not connected. Payment cannot be processed at this time.")
    }
    return (
        <InfoBarContainer>
            <InfoBarHeader>
                <h2>{id}</h2>
            </InfoBarHeader>
            <InfoBarBody>
                {
                    (content === 'office') &&
                    <section>
                        <h3>Welcome to ESUT Alumni Relations Office</h3>
                        <p> As part of its mission to increase awareness, pride, participation, 
                            and philanthropic commitment to ESUT, ESUT's Alumni Relations office engages the ESUT Alumni Association and sustains a lifelong and worldwide community of alumni, 
                            future alumni, and friends through opportunities for meaningful engagement.
                        </p>

                        <p>
                            As we work together to develop a stronger ESUT, the Alumni Relations 
                            office provides mentorship and assistance to current students, recruits 
                            students to ESUT and to their professional organizations. Alumni Relations offers a 
                            variety of opportunities, whether you're interested in connecting with former 
                            students in your area, recruiting new alumni to ESUT, or helping arrange alumni/alumnae programs. 
                            Search for enjoyable activities that fit your interests, abilities, and schedule.
                        </p>

                        <p>
                            Students and graduates of ESUT have the power to change and affect the world. 
                            Excellence at ESUT is inspired by generous donors who provide financial support for bright students, 
                            high-caliber professors and major research that helps the society, fosters innovation and new 
                            knowledge while improving lives of students and teachers alike. Students and faculty at ESUT rely on 
                            contributions of all sorts and sizes to perform groundbreaking work that has a positive impact.
                        </p>

                        <p>
                            ESUT is a better place because of your generosity. Students, teachers and 
                            significant research are supported by philanthropy in ways that benefit society, 
                            foster innovation, add to our collective wisdom and impact lives.
                        </p>

                        <h4>Annual/Periodic Donations include:</h4>

                        <h5>THE ESUT TRUST FUND</h5>
                        <article>
                            It is a priority for the institution to receive unrestricted gifts. It is possible for us to 
                            strategically address developing needs at ESUT and take advantage of 
                            new opportunities as they arise by directing gifts to the ESUT Fund for Excellence.
                        </article>
                        <h5>THE ESUT DEAN’S FUND</h5>
                        <article>
                            By giving scholarships, student enrichment opportunities, academic innovations, 
                            staff assistance, and technology updates to help our students become the best they can be. 
                            It is possible for a donor to support the college or school of their choice.
                        </article>
                        <h5>THE ESUT LIBRARIAN ENTERPRISING FUND</h5>
                        <article>
                            In addition, gifts to the Library allow the Library to expand its physical and 
                            electronic holdings to meet the changing requirements of students and to enhance their learning. 
                            Gifts also assist us upgrade our 
                            facilities to accommodate our growing collections and the latest technologies.
                        </article>
                        <h5>THE ESUT SPORTS FUND</h5>
                        <article>
                            By supporting scholarships, academic assistance, life skills development, 
                            and recruiting, gifts to SPORTS FUND directly benefit our student athletes.
                        </article>
                        <h5>THE ESUT PARENT’S FUND</h5>
                        <article>
                            Because to the Parent Fund, ESUT administrators have the flexibility needed to address students' 
                            most pressing needs. Every aspect of student life at ESUT—from financial assistance to facility 
                            renovations to student-life programs—benefits from parent support.
                        </article>

                        <p>  
                            <a target="_blank" href="https://firebasestorage.googleapis.com/v0/b/esut-alumni.appspot.com/o/statics%2FESUT-%20ALUMNI%20RELATIONS%20OFFICE%20%20ROLE%2C%20TOOLS%20AND%20STRATEGIES%20New.pdf?alt=media&token=c5c09e67-6bd9-402d-8025-c30e22d50480">
                                Learn more our role, tools and strategies (PDF)</a> <br/><br/>                       
                            <Link to={'/give to ESUT'} style={{fontSize: "18px"}}>Make a donation</Link><br/>
                            <Link to={'/our policy'} style={{fontSize: "18px"}}>Our policy statement</Link>
                        </p>
                    </section>
                }

                {
                    content === "policy" && 
                    <section>
                        <h3>Policy Statement</h3>
                        <p>
                            It is in the best interests of the ESUT for all stakeholders to follow the 
                            Alumni Relations Policy, which aims to ease the implementation of an integrated AR
                            strategy for the university as a whole. The policy is built on some concepts 
                            that underpin the ESUT's advancement among all of its internal and external stakeholders.
                            In contrast, the policy's regulations and guidelines ensure that the institution follows 
                            best-practice standards in the Higher Education (HE) sector. 
                        </p>
                            
                        <p>
                            The policy governs
                            the critical interaction between the university and its alumni.
                            Given the university's unique management approach and organizational culture, 
                            the policy strives to clarify the varied tasks and responsibilities of AR role players, 
                            both at the institutional and campus levels, in administering various alumni initiatives. 
                            It also specifies the components of an integrated ESUT Alumni Relations model, 
                            distinguishes the roles of internal AR structures and external governing bodies, 
                            and explains the mechanisms for coordinating all alumni activities at the school.
                        </p>
                        <p>
                            <b>For more on policy see</b> <a target="_blank" href="https://firebasestorage.googleapis.com/v0/b/esut-alumni.appspot.com/o/statics%2FESUT%20Alumni%20Relations%20Policy%20Final%20Draft.pdf?alt=media&token=d49d3d17-bdee-441c-bd83-8f97f8b782f9">full details of Policy Statement, Definitions, General Principles, 
                            Responsibilities and Roles (PDF)</a>
                        </p>
                    </section>
                }

                { content == "give" &&
                    <section style={{width: "60%", margin:"0 auto"}}>
                        <div style={{textAlign: "center"}}>
                            <b>Thank you for supporting Enugu State University of Science and Technology</b>
                            <br/>
                            <span style={{fontStyle:"italic"}}>Each and every gift has a significant impact on the ESUT community!</span>
                        </div>
                        <form style={{border:"1px solid #ccc",padding:"10px",marginTop:"10px"}} onSubmit={donate}>
                            <h5>Gift details</h5>
                            <br></br>
                            <div>
                                <label>Gift amount:</label>
                                <input type="number" placeholder='Enter amount'/>
                            </div>
                            <div>
                                <label>I wish to support:</label>
                                <select>
                                    <option>The ESUT Trust Fund</option>
                                    <option>The ESUT DEAN’S Fund</option>
                                    <option>The ESUT Librarian Enterprising Fund</option>
                                    <option>The ESUT Sports Fund</option>
                                    <option>The ESUT Parent’S Fund</option>
                                    <option>Other...</option>
                                </select>
                            </div>
                            <div>
                                <label>Is this a pledge payment?</label>
                                <input type="radio" style={{width:"2%"}} name="pledge" value="Yes"/> <span>Yes</span><br/>
                                <input type="radio" style={{width:"2%"}} name="pledge"value="No"/> <span>No</span>
                            </div>
                            <div>
                                <label>I wish to remain anonymous for this gift.</label>
                                <input type="radio" style={{width:"2%"}} name="anonymous" value="Yes"/> <span>Yes</span><br/>
                                <input type="radio"style={{width:"2%"}} name="anonymous" value="No"/> <span>No</span>
                            </div>
                            <br/>
                            <hr/>
                            <div>
                                <h5>Personal Information</h5>
                                <br></br>
                                <div>
                                    <label>Title:</label>
                                    <input type="text" name="title"/>
                                </div>
                                <div>
                                    <label>Firstname:</label>
                                    <input type="text" name="firstname"/>
                                </div>
                                <div>
                                    <label>Lastname:</label>
                                    <input type="text" name="lastname"/>
                                </div>
                                <div>
                                    <label>Email:</label>
                                    <input type="email" name="email"/>
                                </div>
                                <div>
                                    <label>Occupation:</label>
                                    <input type="text" name="occupation"/>
                                </div>
                                <div>
                                    <label>City:</label>
                                    <input type="text" name="city"/>
                                </div>
                                
                                <div>
                                    <label>Country:</label>
                                    <input type="text" name="country"/>
                                </div>
                            </div>
                            <div>
                                <button type='submit'>Continue</button>
                            </div>
                        </form>
                    </section>
                }
            </InfoBarBody>
        </InfoBarContainer>
    )
}

export default InfoBar
