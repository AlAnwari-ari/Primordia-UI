import React, { Component } from 'react' 
import './Epaper.css'
import axios from 'axios'
import { urlAPI } from '../../helper/urlAPI'
import moment from 'moment'
import { Spinner } from 'reactstrap';
// import moment from 'moment'


class Epaper extends Component {
    state = {
        dataPublisher: [],
        dataKoran: [],
        selectedPublisherAdd: 0,
        tanggalAdd: moment().format('YYYY-MM-DD'),
        edisiAdd: '',
        editSelectId: 0,
        editSelectPublisher: '',
        editSelectTanggal: '',
        editSelectEdisi: '',
        selectedEpaper: 0,
        selectedEpaperData: {},
        selectedEpaperImage: null,
        selectedEpaperPath: '',
        selectedEpaperImageData: [],
        loadingBtn: false,
        pageControl: false,
        editSelectedImage : 0,
        editSelectedImagePage: 0,
        editImagePage: null,
        editImagePageTampil : null,
        currentPage: 1,
        postsPerPage: 5,
        maxPageKoran: 0,
        maxPageKoranImage: 0,

    }

    componentDidMount () {
        this.getDataPublisher()
        this.getDataKoran()
    }

    componentDidUpdate () {
        if (this.state.selectedEpaper !== 0 && this.state.pageControl) {
            this.getImageKoran(this.state.selectedEpaper)
            this.setState({ pageControl: false })
        }
    }

    //============= INPUTAN =============

    onSelectPublisher = (e) => {
        this.setState({selectedPublisherAdd: e.target.value})
    }
    onInputTanggalAdd = (e) => {
        this.setState({tanggalAdd: e.target.value})
    }
    onInputEdisiAdd = (e) => {
        this.setState({edisiAdd: e.target.value})
    }
    onSelectEditPublisher = (e) => {
        this.setState({ editSelectPublisher: e.target.value})
    }
    onInputEditTanggal = (e) => {
        this.setState({editSelectTanggal: e.target.value})
    }
    onInputEditEdisi = (e) => {
        this.setState({editSelectEdisi: e.target.value})
    }
    onInputSelectedEpaperPath = (e) => {
        this.setState({selectedEpaperPath: e.target.value})
    }
    onInputSelectedImagePage = (e) => {
        this.setState({editSelectedImagePage: e.target.value})
    }

    selectedEpaperImage = (e) => {
        console.log(e.target.files)
        if(e.target.files[0]) {
          this.setState({ selectedEpaperImage: e.target.files })
          console.log(this.state.selectedEpaperImage);
          
        } else {
          this.setState({ selectedEpaperImage: null })
        }
    }

    imageEditPageChange = (e) => {
        console.log(e.target.files[0])
        if(e.target.files && e.target.files[0]) {
            let reader = new FileReader();
            reader.onload = (ev) => {
                this.setState({editImagePageTampil:ev.target.result});
            };
            reader.readAsDataURL(e.target.files[0]);
            this.setState({ editImagePage: e.target.files })
        } else {
            this.setState({editImagePage: null, editImagePageTampil: null})
        }
        console.log(this.state.editImagePackage);
        
    }

    //============= GETDATA =============

    getDataPublisher = () => {
        axios.get(urlAPI + '/publisher/getpublisher')
            .then( res => {
                console.log(res.data);
                this.setState({ dataPublisher: res.data})
            })
            .catch( err => {
                console.log(err);
            })
        
    }

    getDataKoran = () => {
        axios.get(urlAPI + '/koran/getkoran')
            .then( res => {
                console.log(res.data);
                this.setState({ dataKoran: res.data, maxPageKoran: Math.ceil(res.data.length / this.state.postsPerPage)})
            })
            .catch( err => {
                console.log(err);
            })
    }

    getImageKoran = (id) => {
        axios.get(urlAPI + '/koran/getimagekoran/' + id)
            .then( res => {
                console.log(res.data);
                this.setState({ selectedEpaperImageData: res.data, maxPageKoranImage: Math.ceil(res.data.length / this.state.postsPerPage)})
            })
            .catch( err => {
                console.log(err);
            })
    }

    //============= BTN =============

    onBtnAddKoran = () => {
        this.setState({ loadingBtn: true })
        var data = {
            idPublisher: parseInt(this.state.selectedPublisherAdd),
            tanggal: this.state.tanggalAdd,
            edisi: this.state.edisiAdd
        }

        axios.post(urlAPI + '/koran/addkoran', data)
            .then( res => {
                console.log('add koran success');
                this.getDataKoran()
                this.setState({
                    selectedPublisherAdd: 0,
                    tanggalAdd: moment().format('YYYY-MM-DD'),
                    edisiAdd: '',
                    loadingBtn: false
                })
            })
            .catch( err => {
                this.setState({ loadingBtn: false })
                console.log(err);
            })

    }

    onBtnDeleteKoran = (id) => {
        this.setState({ loadingBtn: true })
        if(window.confirm('Apakah Anda Yakin?')) {
            axios.delete(urlAPI + '/koran/deletekoran/' + id)
            .then(res => {
                console.log(res);
                this.setState({ loadingBtn: false })  
                this.getDataKoran()     
            })
            .catch(err => {
                this.setState({ loadingBtn: false })
                console.log(err.response);          
            })
        }
    }

    onBtnSaveEditKoran = (id) => {
        this.setState({ loadingBtn: true })
        var data = {
            idPublisher: parseInt(this.state.editSelectPublisher),
            tanggal: this.state.editSelectTanggal,
            edisi: this.state.editSelectEdisi
        }

        axios.put(urlAPI + '/koran/updatekoran/' + id, data)
            .then(res => {
                console.log(res); 
                this.setState({editSelectId: 0, loadingBtn: false }) 
                this.getDataKoran()     
            })
            .catch(err => {
                this.setState({ loadingBtn: false })
                console.log(err);          
            })
    }

    onBtnAddImageSelectedEpaper = () => {
        this.setState({ loadingBtn: true })
        var formdata = new FormData();

        var options = {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }

        var data = {
            path: this.state.selectedEpaperPath + moment(this.state.selectedEpaperData.tanggal).format('YYYY-MM-DD'),
            idKoran: parseInt(this.state.selectedEpaper),
        }

        formdata.append('data', JSON.stringify(data))

        for(var i = 0; i < this.state.selectedEpaperImage.length; i++) {
            formdata.append('image', this.state.selectedEpaperImage[i])
        }

        axios.post(urlAPI + '/koran/addimagekoranpages', formdata, options)
            .then((res) => {
                console.log('upload success', res);
                this.setState({
                    selectedEpaperPath: '',
                    loadingBtn: false
                })
                this.getImageKoran(this.state.selectedEpaper)
                
            })
            .catch((err) => {
                this.setState({ loadingBtn: false })
                console.log(err);
            })
    }

    onBtnDeleteImagePage = (id) => {
        this.setState({ loadingBtn: true })
        if(window.confirm('Apakah Anda Yakin?')) {
            axios.delete(urlAPI + '/koran/deletepagekoran/' + id)
            .then(res => {
                console.log(res);
                this.setState({ loadingBtn: false })  
                this.getImageKoran(this.state.selectedEpaper)     
            })
            .catch(err => {
                this.setState({ loadingBtn: false })
                console.log(err.response);          
            })
        }
        
    }
    
    onBtnSaveEditPageKoran = (id) => {
        this.setState({ loadingBtn: true })

        var data = {
            page: this.state.editSelectedImagePage
        }

        if(this.state.editImagePage) {
            var formdata = new FormData();
    
            var options = {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }
    
            formdata.append('data', JSON.stringify(data))
            formdata.append('image', this.state.editImagePage[0])
    
            axios.put(urlAPI + '/koran/updatepagekoranwithimage/' + id, formdata, options )
                .then(res => {
                    console.log(res);
                    this.setState({  editSelectedImage : 0, loadingBtn: false })  
                    this.getImageKoran(this.state.selectedEpaper)     
                })
                .catch(err => {
                    this.setState({ loadingBtn: false })
                    console.log(err.response);          
                })

        } else {
            axios.put(urlAPI + '/koran/updatepagekoran/' + id, data)
                .then(res => {
                    console.log(res);
                    this.setState({  editSelectedImage : 0, loadingBtn: false })  
                    this.getImageKoran(this.state.selectedEpaper)     
                })
                .catch(err => {
                    this.setState({ loadingBtn: false })
                    console.log(err.response);          
                })
        }
    }

    //============= RENDER =============

    renderBtn = (button) => {
        if (this.state.loadingBtn) {
            return <Spinner size="sm" color="success" />
        }

        return button
    }

    renderOptionPublisher = () => {
        return this.state.dataPublisher.map((item, index) => {
            return (
                <option key={item.id} value={item.id}>{item.nama}</option>
            )
        })
    }

    renderKoran = () => {
        const indexOfLastPost = this.state.currentPage * this.state.postsPerPage
        const indexOfFirstPost = indexOfLastPost - this.state.postsPerPage
        const currentPost = this.state.dataKoran.slice(indexOfFirstPost, indexOfLastPost)

        console.log(currentPost);

        return currentPost.map((item, index) => {
            if(item.id !== this.state.editSelectId) {
                return(
                    <tr key={item.id}>
                        <td>{item.publisher}</td>
                        <td>{moment(item.tanggal).format('YYYY-MM-DD')}</td>
                        <td>{item.edisi}</td>
                        <td><input type="button" value="SELECT" onClick={() => this.setState({ selectedEpaper: item.id, selectedEpaperData: item, pageControl: true, currentPage: 1 })}/></td>
                        <td><input type="button" value="EDIT" onClick={() => this.setState({
                                                                                editSelectId: item.id,
                                                                                editSelectPublisher: parseInt(item.idPublisher),
                                                                                editSelectTanggal: item.tanggal,
                                                                                editSelectEdisi: item.edisi,
                                                                            })}/></td>
                        <td><input type="button" value="DELETE" onClick={() => this.onBtnDeleteKoran(item.id)}/></td>
                    </tr>
                )
            }

            return (
                <tr key={item.id}>
                    <td>
                        <select value={this.state.editSelectPublisher} onChange={this.onSelectEditPublisher}>
                            {this.renderOptionPublisher()}
                        </select>
                    </td>
                    <td><input type="date" value={this.state.editSelectTanggal} onChange={this.onInputEditTanggal}/></td>
                    <td><input type="text" placeholder="Edisi" value={this.state.editSelectEdisi} onChange={this.onInputEditEdisi}/></td>
                    <td><input type="button" value="CANCEL" onClick={() => this.setState({editSelectId: 0})}/></td>
                    <td colSpan="2"><input type="button" value="SAVE" onClick={() => this.onBtnSaveEditKoran(item.id)}/></td>

                </tr>
            )
        })
    }

    renderImageKoran = () => {
        const indexOfLastPost = this.state.currentPage * this.state.postsPerPage
        const indexOfFirstPost = indexOfLastPost - this.state.postsPerPage
        const currentPost = this.state.selectedEpaperImageData.slice(indexOfFirstPost, indexOfLastPost)

        console.log(currentPost);

        return currentPost.map((item, index) => {
            if(item.id !== this.state.editSelectedImage) {
                return (
                    <tr key={item.id}>
                        <td>{item.page}</td>
                        <td><img src={`${urlAPI}${item.pathImage}`} alt="page"/></td>
                        <td>{item.pathImage}</td>
                        <td>{this.renderBtn(<input type="button" value="EDIT" onClick={() => this.setState({
                                                                                                editSelectedImage : item.id,
                                                                                                editSelectedImagePage: item.page
                                                                                            })}/>)}</td>
                        <td>{this.renderBtn(<input type="button" value="DELETE" onClick={() => this.onBtnDeleteImagePage(item.id)}/>)}</td>
                    </tr>
                )
            }

            return (
                <tr key={item.id}>
                    <td><input type="number" value={this.state.editSelectedImagePage} onChange={this.onInputSelectedImagePage}/></td>
                    <td><img src={this.state.editImagePageTampil ? this.state.editImagePageTampil : `${urlAPI}${item.pathImage}`} alt="page"/></td>
                    <td><input type="file" onChange={this.imageEditPageChange}/></td>
                    <td><input type="button" value="CANCEL" onClick={() => this.setState({ editSelectedImage : 0 })}/></td>
                    <td><input type="button" value="SAVE" onClick={() => this.onBtnSaveEditPageKoran(item.id)}/></td>
                </tr>
            )
        })
    }

    renderNumberPaginationKoran = () => {
        const maxNumberPage = 11
        const delta = 5 
        var pages = []
               
        var lastPage =   this.state.maxPageKoran <= maxNumberPage ? this.state.maxPageKoran : maxNumberPage
        var firstPage =  lastPage > maxNumberPage ? (lastPage - 10) : 1
        const maxPage = lastPage

        while (lastPage - this.state.currentPage < delta && lastPage !== this.state.maxPageKoran) {
            lastPage ++
            firstPage ++
        }
        
        console.log(this.state.maxPageKoran);   
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

    renderNumberPaginationKoranImage = () => {
        const maxNumberPage = 11
        const delta = 5 
        var pages = []
               
        var lastPage =   this.state.maxPageKoranImage <= maxNumberPage ? this.state.maxPageKoranImage : maxNumberPage
        var firstPage =  lastPage > maxNumberPage ? (lastPage - 10) : 1
        const maxPage = lastPage

        while (lastPage - this.state.currentPage < delta && lastPage !== this.state.maxPageKoranImage) {
            lastPage ++
            firstPage ++
        }
        
        console.log(this.state.maxPageKoranImage);   
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
            <div className="epaper-container">
                {
                    this.state.selectedEpaper === 0
                    ?
                    <div className="epaper-list">
                        <h4>Epaper</h4>
                        <table>
                            <thead>
                                <tr>
                                    <th>Publisher</th>
                                    <th>Tanggal</th>
                                    <th>Edisi</th>
                                    <th>Keterangan</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>
                                        <select value={this.state.selectedPublisherAdd} onChange={this.onSelectPublisher}>
                                            <option value={0}>--Pilih Publisher--</option>
                                            {this.renderOptionPublisher()}
                                        </select>
                                    </td>
                                    <td><input type="date" value={this.state.tanggalAdd} onChange={this.onInputTanggalAdd}/></td>
                                    <td><input type="text" placeholder="Edisi" value={this.state.edisiAdd} onChange={this.onInputEdisiAdd}/></td>
                                    <td colSpan="3"><input type="button" value="ADD" onClick={this.onBtnAddKoran}/></td>
                                </tr>
                            </tbody>
                        </table>
                        <table>
                            <thead>
                                <tr>
                                    <th>Publisher</th>
                                    <th>Tanggal</th>
                                    <th>Edisi</th>
                                    <th colSpan="3">Keterangan</th>
                                </tr>
                            </thead>
            
                            <tbody>
                                {this.renderKoran()}                       
                            </tbody>
            
                            {/* <tfoot>
                                <tr>
                                    <td>
                                        <select value={this.state.selectedPublisherAdd} onChange={this.onSelectPublisher}>
                                            <option value={0}>--Pilih Publisher--</option>
                                            {this.renderOptionPublisher()}
                                        </select>
                                    </td>
                                    <td><input type="date" value={this.state.tanggalAdd} onChange={this.onInputTanggalAdd}/></td>
                                    <td><input type="text" placeholder="Edisi" value={this.state.edisiAdd} onChange={this.onInputEdisiAdd}/></td>
                                    <td colSpan="3"><input type="button" value="ADD" onClick={this.onBtnAddKoran}/></td>
                                </tr>
                            </tfoot> */}
                        </table>

                        <div className="number-pagination">
                            <span className={ this.state.currentPage === 1 ? "visibility-pagination" : null } onClick={() => this.setState({currentPage: this.state.currentPage - 1})}>Prev</span>
                            <ul>            
                                {this.renderNumberPaginationKoran()}
                            </ul>
                            <span className={ this.state.currentPage === this.state.maxPageKoran ? "visibility-pagination" : null } onClick={() => this.setState({currentPage: this.state.currentPage + 1})}>Next</span>         
                        </div>
                    </div>

                    :

                    <div className="epaper-pages">
                        <p className="go-back" onClick={() => this.setState({ selectedEpaper: 0, selectedEpaperData: {}, selectedEpaperImageData: [], currentPage: 1 })} >Go Back</p>
                        <h4>Manage Pages</h4>
                        <div className="info-entry">
                            <table>
                                <tbody>
                                    <tr>
                                        <th>Nama</th>
                                        <td>{this.state.selectedEpaperData.publisher}</td>
                                    </tr>
                                    <tr>
                                        <th>Tanggal</th>
                                        <td>{moment(this.state.selectedEpaperData.tanggal).format('YYYY-MM-DD')}</td>
                                    </tr>
                                    <tr>
                                        <th>Edisi</th>
                                        <td>{this.state.selectedEpaperData.edisi}</td>
                                    </tr>
                                </tbody>
                            </table>

                            <table>
                                <thead>
                                    <tr>
                                        <th>Image Halaman Epaper</th>
                                        <th>Nama Folder</th>
                                        <th>Keterangan</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td><input type="file" onChange={this.selectedEpaperImage} multiple/></td>
                                        <td><input type="text" value={this.state.selectedEpaperPath} onChange={this.onInputSelectedEpaperPath}/></td>
                                        <td>{this.renderBtn(<input type="button" value="ADD" onClickCapture={this.onBtnAddImageSelectedEpaper}/>)}</td>
                                    </tr>
                                </tbody>
                                <tfoot>
                                    <tr>
                                        <td colSpan="3"><p>Nama Folder isi inisial publisher</p></td>
                                    </tr>
                                </tfoot>
                            </table>
                            
                        </div>
        
                        <div className="list-page">
                            <table>
                                <thead>
                                    <tr>
                                        <th>Halaman</th>
                                        <th>Image</th>
                                        <th>Path Image</th>
                                        <th colSpan="2">Keterangan</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.renderImageKoran()}
        
                                </tbody>
                            </table>
                        </div>

                        <div className="number-pagination">
                            <span className={ this.state.currentPage === 1 ? "visibility-pagination" : null } onClick={() => this.setState({currentPage: this.state.currentPage - 1})}>Prev</span>
                            <ul>            
                                {this.renderNumberPaginationKoranImage()}
                            </ul>
                            <span className={ this.state.currentPage === this.state.maxPageKoranImage ? "visibility-pagination" : null } onClick={() => this.setState({currentPage: this.state.currentPage + 1})}>Next</span>         
                        </div>
                    </div>
                    
                }
    
    
            </div>
        )
    }
}

export default Epaper;
