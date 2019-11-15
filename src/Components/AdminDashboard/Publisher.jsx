import React, { Component } from 'react' 
import './Publisher.css'
import axios from 'axios'
import { urlAPI } from '../../helper/urlAPI'

class Publisher extends Component {
    state = {
        dataPublisher : [],
        namaPublisher: '',
        imagePublisher: null,
        imageTampil: null,
        selectedEditId: '',
        editNamaPublisher: '',
        editPathLogo: '',
        editImagePublisher: null,
        editImageTampil: null,
        currentPage: 1,
        postsPerPage: 5,
        maxPage: 0,
        
    }

    componentDidMount () {
        this.getDataPublisher()
    }

    //============= INPUTAN =============

    onInputNamaPublisher = (e) => {
        this.setState({namaPublisher: e.target.value})
    }

    imagePublisherChange = (e) => {
        console.log(e.target.files[0])
        if(e.target.files && e.target.files[0]) {
            let reader = new FileReader();
            reader.onload = (ev) => {
                this.setState({imageTampil:ev.target.result});
            };
            reader.readAsDataURL(e.target.files[0]);
        } else {
            return this.setState({imageTampil: null })
        }
        this.setState({imagePublisher: e.target.files})
        console.log(this.state.imageRegister);
        
    }

    onInputEditNamaPublisher = (e) => {
        this.setState({editNamaPublisher: e.target.value})
    }

    editImagePublisherChange = (e) => {
        console.log(e.target.files[0])
        if(e.target.files && e.target.files[0]) {
            let reader = new FileReader();
            reader.onload = (ev) => {
                this.setState({editImageTampil:ev.target.result});
            };
            reader.readAsDataURL(e.target.files[0]);
            this.setState({editImagePublisher: e.target.files})
        } else {
            this.setState({editImagePublisher:null, editImageTampil: null })
        }
        console.log(this.state.editImagePublisher);
        
    }

    //============= GETDATA =============

    getDataPublisher = () => {
        axios.get(urlAPI + '/publisher/getpublisher')
            .then( res => {
                console.log(res.data);
                this.setState({ dataPublisher: res.data, maxPage : Math.ceil(res.data.length / this.state.postsPerPage)})
            })
            .catch( err => {
                console.log(err);
            })
        
    }

    //============= BTN =============

    onBtnAddPublisher = () => {
        var formdata = new FormData();

        var options = {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }

        var data = {
            nama: this.state.namaPublisher
        }

        formdata.append('image', this.state.imagePublisher[0])
        formdata.append('data', JSON.stringify(data))

        axios.post(urlAPI + '/publisher/addpublisher', formdata, options)
            .then((res) => {
                console.log('add success');
                this.setState({
                    namaPublisher: '',
                    imagePublisher: null,
                    imageTampil: null
                })
                this.getDataPublisher()
            })
            .catch((err) => {
                console.log(err);              
            })

    }

    onBtnDeletePublisher = (id) => {
        if(window.confirm('Yakin nih Bro?')) {
            axios.delete(urlAPI + '/publisher/deletepublisher/' + id)
            .then(res => {
                console.log(res);  
                this.getDataPublisher()     
            })
            .catch(err => {
                console.log(err.response);          
            })
        }

    }

    onBtnSaveEditPublisher = (id) => {
        if(this.state.editImagePublisher) {
            var formdata = new FormData();

            var options = {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }

            var data = {
                nama: this.state.editNamaPublisher
            }

            formdata.append('image', this.state.editImagePublisher[0])
            formdata.append('data', JSON.stringify(data))

            axios.put(urlAPI + '/publisher/updatepublisherwithimage/' + id, formdata, options)
                .then((res) => {
                    console.log('save success');
                    this.setState({selectedEditId: 0})
                    this.getDataPublisher()           
                })
                .catch(err => {
                    console.log(err);                   
                })
            
        } else {
            axios.put(urlAPI + '/publisher/updatepublisher/' + id, { nama: this.state.editNamaPublisher })
                .then((res) => {
                    console.log('save success');
                    this.setState({selectedEditId: 0})
                    this.getDataPublisher()           
                })
                .catch(err => {
                    console.log(err.response);                   
                })
        }
    }


    //============= RENDER =============

    renderPublisher = () => {
        const indexOfLastPost = this.state.currentPage * this.state.postsPerPage
        const indexOfFirstPost = indexOfLastPost - this.state.postsPerPage
        const currentPost = this.state.dataPublisher.slice(indexOfFirstPost, indexOfLastPost)

        console.log(currentPost);
        
        
        return currentPost.map((item,index) => {
            if(item.id !== this.state.selectedEditId) {
                return (
                    <tr key={item.id}>
                        <td>{item.nama}</td>
                        <td><img src={`${urlAPI}${item.pathLogo}`} alt="logo"/></td>
                        <td>{item.pathLogo}</td>
                        <td><input type="button" value="EDIT" onClick={() => this.setState({
                                                                                    selectedEditId: item.id,
                                                                                    editNamaPublisher: item.nama,
                                                                                    editPathLogo: item.pathLogo
                                                                                })}/></td>
                        <td><input type="button" value="DELETE" onClick={() => this.onBtnDeletePublisher(item.id)}/></td>
                    </tr>
                )
            }

            return (
                <tr key={item.id}>
                    <td><input type="text" value={this.state.editNamaPublisher} onChange={this.onInputEditNamaPublisher}/></td>
                    <td><img src={this.state.editImageTampil ? this.state.editImageTampil : `${urlAPI}${item.pathLogo}`} alt="logo"/></td>
                    <td><input type="file" onChange={this.editImagePublisherChange}/></td>
                    <td><input type="button" value="CANCEL" onClick={()=> this.setState({selectedEditId: 0})}/></td>
                    <td><input type="button" value="SAVE" onClick={() => this.onBtnSaveEditPublisher(item.id)}/></td>
                </tr>
            )
        })
    }

    renderNumberPagination = () => {
        const maxNumberPage = 11
        const delta = 5 
        var pages = []
               
        var lastPage =   this.state.maxPage <= maxNumberPage ? this.state.maxPage : maxNumberPage
        var firstPage =  lastPage > maxNumberPage ? (lastPage - 10) : 1
        const maxPage = lastPage

        while (lastPage - this.state.currentPage < delta && lastPage !== this.state.maxPage) {
            lastPage ++
            firstPage ++
        }
        
        console.log(this.state.maxPage);   
        console.log(firstPage, lastPage );        

        for (var i = 0; i < maxPage; i++) {
            pages[i] = parseInt(firstPage)
            firstPage ++
        }
        
        console.log(pages);        
        
        return pages.map((item) => {
            var classes = this.state.currentPage === item ? 'active-pagination' : '';

            return (
                <li key={item} className={classes} onClick={() => this.setState({ currentPage: item })}>{item}</li>
            )
        })
    }

    render() {
        return (
            <div className="publisher-container">
                <h4>Publisher</h4>
                <table>
                    <thead>
                        <tr>
                            <th colSpan="5">Entry Data</th>
                        </tr>
                    </thead>
                    <tfoot>
                        <tr>
                            <td><input type="text" placeholder="Nama Publisher" value={this.state.namaPublisher} onChange={this.onInputNamaPublisher}/></td>
                            <td>{this.state.imageTampil ? <img src={this.state.imageTampil} alt="logo"/> : null }<input type="file" onChange={this.imagePublisherChange}/></td>
                            <td colSpan="3"><input type="button" value="ADD" onClick={this.onBtnAddPublisher}/></td>
                        </tr>
                    </tfoot>         
                </table>
                <table>
                    <thead>
                        <tr>
                            <th>Nama</th>
                            <th>Image</th>
                            <th>Path Image</th>
                            <th colSpan="2">Keterangan</th>
                        </tr>
                    </thead>
    
                    <tbody>
                        {this.renderPublisher()}      
                    </tbody>
    
                </table>
                <div className="number-pagination">
                    <span className={ this.state.currentPage === 1 ? "visibility-pagination" : null } onClick={() => this.setState({currentPage: this.state.currentPage - 1})}>Prev</span>
                    <ul>            
                        {this.renderNumberPagination()}
                    </ul>
                    <span className={ this.state.currentPage === this.state.maxPage ? "visibility-pagination" : null } onClick={() => this.setState({currentPage: this.state.currentPage + 1})}>Next</span>         
                </div>
    
            </div>
        )   
    }  
}

export default Publisher