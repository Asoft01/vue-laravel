<template>
    <div>
        <div class="container">
            <h2 class="text-center p-2 text-white bg-primary mt-5">Edit Contact</h2>

            <div class="card-body">
                <div class="col-md-6 offset-md-3">
                    <form id="validateForm" @submit.prevent="updateContact" enctype="multipart/form-data" novalidate>

                        <div class="alert alert-danger" v-if="errors.length">
                            <ul class="mb-0">
                                <li v-for="(error, index) in errors" :key="index">
                                    {{ error }}
                                </li>
                            </ul>
                        </div>

                        <div class="form-group">
                            <label for="name">Name</label>
                            <input type="text" id="name" v-model="contact.name" class="form-control" placeholder="Enter Name">
                        </div>

                         <div class="form-group">
                            <label for="email">Email</label>
                            <input type="email" id="email" v-model="contact.email" class="form-control" placeholder="Enter Email">
                        </div>

                         <div class="form-group">
                            <label for="designation">Designation</label>
                            <input type="text" id="designation" v-model="contact.designation" class="form-control" placeholder="Enter Designation">
                        </div>
                        
                         <div class="form-group">
                            <label for="contact_number">Contact Number</label>
                            <input type="number" id="contact_no" v-model="contact.contact_no" class="form-control" placeholder="Enter Contact Number">
                        </div>

                         <div class="form-group">
                            <label for="">Biography</label>
                            <textarea id="bio" v-model="contact.bio" class="form-control" cols="20" rows="5" placeholder="Enter Biography"></textarea>
                        </div>

                        <div class="form-group" v-if="contact.image">
                            <img :src="`${url + '/' + contact.image}`" alt="image" width="100" height="150"> 
                        </div>

                         <div class="custom-file">
                            <input type="file" id="validatedCustomFile" class="custom-file-input" v-on:change="onImageChange">
                            <label class="custom-file-label" for="validatedCustomFile">Choose File...</label>
                        </div>

                        <button class="btn btn-primary mt-4">Submit</button>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            url: document.head.querySelector('meta[name="url"]').content,
            contact:{},
            name: '',
            email: '',
            bio: '',
            designation: '',
            contact_no: '',
            errors: []
        }
    },
    methods: {
        loadData(){
            let url = this.url + `/api/get_contact/${this.$route.params.id}`;
            this.axios.get(url).then((response)=> {
                this.contact = response.data;
                console.log(this.contact);
            })
        },
          updateContact(){
            this.errors = [];
            if(!this.contact.name){
                this.errors.push('Name is required');
            }
            if(!this.contact.email){
                this.errors.push("Email is required");
            }
            if(!this.contact.designation){
                this.errors.push("Designation is required");
            }
            if(!this.contact.contact_no){
                this.errors.push("Contact Number is required");
            }

            if(!this.errors.length){
                let formData = new FormData();
                formData.append('name', this.contact.name);
                formData.append('email', this.contact.email);
                formData.append('image', this.image);
                formData.append('designation', this.contact.designation);
                formData.append('contact_no', this.contact.contact_no);
                formData.append('bio', this.contact.bio);

                let url = this.url + `/api/update_contact/${this.$route.params.id}`;
                this.axios.post(url, formData).then((response) =>{
                    console.log(response);

                    if(response.status){

                      this.$utils.showSuccess('success', response.message);
                      this.$router.push({
                        name: '/'
                      });
                    }else{
                        this.$utils.showError('Error', response.message);
                    }
                }).catch(error => {
                    // If there is error from the API
                    this.errors.push(error.response.data.error);
                });
            }
        },
        onImageChange(e){
            this.image = e.target.files[0];
            console.log(this.image);
        }
    },
    created() {
        this.loadData();
    },
    mounted() {
        console.log('Edit Contact Components Loaded');
    }
}
</script>