import React, { Component } from 'react' 
import './Package.css'
import axios from 'axios'
import { urlAPI } from '../../helper/urlAPI'


class Package extends Component {
    state = {
        dataPackage : [],
        namaPackage: '',
        hargaPackage: '',
        descPackage: '',
        imagePackage: null,
        imageTampil: null,
        selectedEditId: '',
        editNamaPackage: '',
        editHargaPackage: '',
        editDescPackage: '',
        editPathPaket: '',
        editImagePackage: null,
        editImageTampil: null,
    }

    componentDidMount () {
        this.getDataPackage()
    }

    //============= INPUTAN =============

    onInputNamaPackage = (e) => {
        this.setState({namaPackage: e.target.value})
    }
    onInputHargaPackage = (e) => {
        this.setState({hargaPackage: e.target.value})
    }
    onInputDescPackage = (e) => {
        this.setState({descPackage: e.target.value})
    }
    onInputEditNamaPackage = (e) => {
        this.setState({editNamaPackage: e.target.value})
    }
    onInputEditHargaPackage = (e) => {
        this.setState({editHargaPackage: e.target.value})
    }
    onInputEditDescPackage = (e) => {
        this.setState({editDescPackage: e.target.value})
    }

    imagePackageChange = (e) => {
        console.log(e.target.files[0])
        if(e.target.files && e.target.files[0]) {
            let reader = new FileReader();
            reader.onload = (ev) => {
                this.setState({imageTampil:ev.target.result});
            };
            reader.readAsDataURL(e.target.files[0]);
            this.setState({imagePackage: e.target.files})
        } else {
            this.setState({imagePackage:null, imageTampil: null })
        }
        console.log(this.state.imageRegister);
        
    }

    imageEditPackageChange = (e) => {
        console.log(e.target.files[0])
        if(e.target.files && e.target.files[0]) {
            let reader = new FileReader();
            reader.onload = (ev) => {
                this.setState({editImageTampil:ev.target.result});
            };
            reader.readAsDataURL(e.target.files[0]);
            this.setState({editImagePackage: e.target.files})
        } else {
            this.setState({editImagePackage: null, editImageTampil: null })
        }
        console.log(this.state.editImagePackage);
        
    }

    //============= GETDATA =============

    getDataPackage = () => {
        axios.get(urlAPI + '/package/getpackage')
            .then( res => {
                console.log(res.data);
                this.setState({ dataPackage: res.data})
            })
            .catch( err => {
                console.log(err);
            })
        
    }

    //============= BTN =============

    onBtnAddPackage = () => {
        var formdata = new FormData();

        var options = {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }

        var data = {
            namaPaket: this.state.namaPackage,
            hargaBulanan: this.state.hargaPackage,
            deskripsi: this.state.descPackage
        }

        formdata.append('image', this.state.imagePackage[0])
        formdata.append('data', JSON.stringify(data))

        axios.post(urlAPI + '/package/addpackage', formdata, options)
            .then((res) => {
                console.log('add pkt success');
                this.setState({
                    namaPackage: '',
                    hargaPackage: 0,
                    descPackage: '',
                    imagePackage: null,
                    imageTampil: null
                })
                this.getDataPackage()
            })
            .catch((err) => {
                console.log(err);              
            })
    }

    onBtnDeletePackage = (id) => {
        if(window.confirm('Apakah Anda Yakin?')) {
            axios.delete(urlAPI + '/package/deletepackage/' + id)
            .then(res => {
                console.log(res);  
                this.getDataPackage()     
            })
            .catch(err => {
                console.log(err.response);          
            })
        }

    }

    onBtnSaveEditPackage = (id) => {
        var data = {
            namaPaket: this.state.editNamaPackage,
            hargaBulanan: this.state.editHargaPackage,
            deskripsi: this.state.editDescPackage
        }

        if(this.state.editImagePackage) {
            var formdata = new FormData();

            var options = {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }

            formdata.append('image', this.state.editImagePackage[0])
            formdata.append('data', JSON.stringify(data))

            axios.put(urlAPI + '/package/updatepackagewithimage/' + id, formdata, options)
                .then((res) => {
                    console.log('save success');
                    this.setState({selectedEditId: 0})
                    this.getDataPackage()           
                })
                .catch(err => {
                    console.log(err);                   
                })
            
        } else {
            axios.put(urlAPI + '/package/updatepackage/' + id, data)
                .then((res) => {
                    console.log('save success');
                    this.setState({selectedEditId: 0})
                    this.getDataPackage()           
                })
                .catch(err => {
                    console.log(err.response);                   
                })
        }
    }

    //============= RENDER =============

    renderPackage = () => {
        return this.state.dataPackage.map((item, index) => {
            if(item.id !== this.state.selectedEditId) {
                return (
                    <tr key={item.id}>
                        <td>{item.namaPaket}</td>
                        <td>Rp{item.hargaBulanan}</td>
                        <td>{item.deskripsi}</td>
                        <td><img src={`${urlAPI}${item.pathPaket}`} alt="gbr"/><p>{item.pathPaket}</p></td>
                        <td><input type="button" value="EDIT" onClick={() => this.setState({
                                                                                        selectedEditId: item.id,
                                                                                        editNamaPackage: item.namaPaket,
                                                                                        editHargaPackage: item.hargaBulanan,
                                                                                        editDescPackage: item.deskripsi,
                                                                                        editPathPaket: item.pathLogo
                                                                                    })}/></td>
                        <td><input type="button" value="DELETE" onClick={() => this.onBtnDeletePackage(item.id)}/></td>
                    </tr>
                )
            }

            return (
                <tr key={item.id}>
                    <td><input type="text" value={this.state.editNamaPackage} onChange={this.onInputEditNamaPackage}/></td>
                    <td><input type="number" value={this.state.editHargaPackage} onChange={this.onInputEditHargaPackage}/></td>
                    <td><textarea value={this.state.editDescPackage} onChange={this.onInputEditDescPackage}></textarea></td>
                    <td>{this.state.editImageTampil ? <img src={this.state.editImageTampil} alt="logo"/> : null } <input type="file" onChange={this.imageEditPackageChange}/></td>
                    <td><input type="button" value="CANCEL" onClick={()=> this.setState({selectedEditId: 0})}/></td>
                    <td><input type="button" value="SAVE" onClick={() => this.onBtnSaveEditPackage(item.id)}/></td>
                </tr>
            )
        })
    }

    renderImagePackage = () => {
        return this.state.dataPackage.map((item, index) => {
            return (
                <tr>
                    <td>{item.namaPaket}</td>
                    <td><img src={`${urlAPI}${item.pathPaket}`} alt="gbr"/></td>
                </tr>
            )
        })
    }



    render() {
        return (
            <div className="paket-container">
                <h4>Package</h4>
                <table className="tabel-paket">
                    <thead>
                        <tr>
                            <th>Nama</th>
                            <th>Harga</th>
                            <th>Deskripsi</th>
                            <th>Image</th>
                            <th colSpan="2">Keterangan</th>
                        </tr>
                    </thead>
    
                    <tbody>
                        {this.renderPackage()}
                        
                    </tbody>
    
                    <tfoot>
                        <tr>
                            <td><input type="text" placeholder="Nama Package" value={this.state.namaPackage} onChange={this.onInputNamaPackage}/></td>
                            <td><input type="number" placeholder="Harga" value={this.state.hargaPackage} onChange={this.onInputHargaPackage}/></td>
                            <td><textarea value={this.state.descPackage} onChange={this.onInputDescPackage}/></td>
                            <td>{this.state.imageTampil ? <img src={this.state.imageTampil} alt="logo"/> : null }<input type="file" onChange={this.imagePackageChange}/></td>
                            <td colSpan="2"><input type="button" value="ADD" onClick={this.onBtnAddPackage}/></td>
                        </tr>
                    </tfoot>
                </table>
    
            </div>
        )
    }
}

export default Package;