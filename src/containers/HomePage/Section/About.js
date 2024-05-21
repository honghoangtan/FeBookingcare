import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import { FormattedMessage } from 'react-intl';

import Slider from "react-slick";

import { languages } from '../../../utils';

class About extends Component {

    render() {

        

        return (
            <div className='section-share section-about'>
                <div className='section-about-header'>
                    <FormattedMessage id="homepage.section-about" />
                </div>

                <div className='section-about-body'> 
                    <div className='container'>
                        <div className='row'>
                            <div className='col-6'>
                                {/* <iframe width="100%" height="277px" 
                                    src="https://www.youtube.com/embed/JvOg0TSvdGU" 
                                    title="WXRDIE - LAVIAI (REMIX) ft. HIEUTHUHAI &amp; 2PILLZ" 
                                    frameBorder="0" 
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                                    allowFullScreen>
                                </iframe> */}
                                <iframe width="100%" height="277px" src="https://www.youtube.com/embed/epBL9Mbq_sU" title="TINLE, ​⁠APJ - 12H03 (Official MV)" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
                            </div>
                            
                            <div className='col-6 content-right'>
                                { this.props.language === languages.VI ?

<p>
Các bạn có thể làm chủ công nghệ, cũng như học được, biết được những kiến thức thực tế dùng tại các công ty hiện nay. Sau khi kết thúc khóa học này, mình tin chắc rằng dự án này đủ lớn, đủ thực tế để cho các bạn mới ra trường viết vào CV xin việc của mình ^^

✔ Các bạn hiểu được 1 FullStack Web Developer thì cần chuẩn bị những gì. Ở đây, mình không dám chắc 100% các bạn sẽ trở thành Fullstack Developer, nhưng nếu bạn chọn Frontend hay Backend thì khóa học này cũng cung cấp cho bạn nhiều điều bổ ích
</p>
:
<p>
You can master technology, as well as learn and gain practical knowledge used in companies today. After finishing this course, I firmly believe that this project is big enough and realistic enough for new graduates to write on their CVs ^^ ✔ If you understand that being a FullStack Web Developer requires preparation things. Here, I'm not 100% sure you will become a Fullstack Developer, but if you choose Frontend or Backend, this course will also provide you with many useful things.
</p>
                                }
                                
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(About);
